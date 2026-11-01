import io
import requests

from PIL import Image

from .supabase import supabase
from .vision import analyze_image
from .pricing import get_market_price


def analyze_feed_post(feed_post_id: str):

    # ==================================================
    # 1. GET FEED POST
    # ==================================================

    post_response = (
        supabase
        .table("feed_posts")
        .select(
            "id, image_url, title"
        )
        .eq(
            "id",
            feed_post_id
        )
        .single()
        .execute()
    )

    if not post_response.data:
        raise ValueError(
            "Feed post not found."
        )

    post = post_response.data

    # ==================================================
    # 2. DOWNLOAD IMAGE
    # ==================================================

    image_response = requests.get(
        post["image_url"],
        timeout=30
    )

    if image_response.status_code != 200:
        raise ValueError(
            "Could not download feed image."
        )

    image = Image.open(
        io.BytesIO(
            image_response.content
        )
    )

    # ==================================================
    # 3. CREATE SCAN
    # ==================================================

    scan_response = (
        supabase
        .table("scans")
        .insert({
            "feed_post_id": feed_post_id,
            "status": "processing"
        })
        .execute()
    )

    if not scan_response.data:
        raise RuntimeError(
            "Failed to create scan."
        )

    scan = scan_response.data[0]
    scan_id = scan["id"]

    try:

        # ==================================================
        # 4. RUN VISION / YOLO
        # ==================================================

        vision_result = analyze_image(image)

        detections = vision_result["counts"]
        bounding_boxes = vision_result["detections"]
        image_size = vision_result["image_size"]

        # ==================================================
        # 5. PROCESS DETECTED ITEMS
        # ==================================================

        analyzed_items = []
        scan_items = []

        total_min = 0
        total_typical = 0
        total_max = 0

        for object_name, quantity in detections.items():

            # --------------------------------------------------
            # Save detected item
            # --------------------------------------------------

            scan_items.append({
                "scan_id": scan_id,
                "object_name": object_name,
                "quantity": quantity
            })

            # --------------------------------------------------
            # Get market pricing
            # --------------------------------------------------

            market_options = get_market_price(
                object_name
            )

            # --------------------------------------------------
            # No pricing data
            # --------------------------------------------------

            if not market_options:

                analyzed_items.append({
                    "object_name": object_name,
                    "quantity": quantity,
                    "price": None
                })

                continue

            # --------------------------------------------------
            # Calculate price range
            # --------------------------------------------------

            min_price = min(
                item["min_price"]
                for item in market_options
            )

            typical_price = round(
                sum(
                    item["typical_price"]
                    for item in market_options
                ) / len(market_options)
            )

            max_price = max(
                item["max_price"]
                for item in market_options
            )

            # --------------------------------------------------
            # Calculate totals
            # --------------------------------------------------

            item_total_min = (
                min_price * quantity
            )

            item_total_typical = (
                typical_price * quantity
            )

            item_total_max = (
                max_price * quantity
            )

            total_min += item_total_min
            total_typical += item_total_typical
            total_max += item_total_max

            # --------------------------------------------------
            # Add analyzed item
            # --------------------------------------------------

            analyzed_items.append({
                "object_name": object_name,
                "quantity": quantity,
                "price": {
                    "min": min_price,
                    "typical": typical_price,
                    "max": max_price
                }
            })

        # ==================================================
        # 6. SAVE SCAN ITEMS
        # ==================================================

        if scan_items:

            (
                supabase
                .table("scan_items")
                .insert(scan_items)
                .execute()
            )

        # ==================================================
        # 7. MARK SCAN COMPLETED
        # ==================================================

        (
            supabase
            .table("scans")
            .update({
                "status": "completed"
            })
            .eq(
                "id",
                scan_id
            )
            .execute()
        )

        # ==================================================
        # 8. RETURN RESULT
        # ==================================================

        return {
            "message": "Image analyzed successfully",

            "scan_id": scan_id,

            "feed_post_id": feed_post_id,

            "title": post["title"],

            "image_size": image_size,

            "detections": bounding_boxes,

            "items": analyzed_items,

            "estimated_total": {
                "min": total_min,
                "typical": total_typical,
                "max": total_max
            }
        }

    except Exception:

        # --------------------------------------------------
        # If analysis fails, mark scan as failed
        # --------------------------------------------------

        (
            supabase
            .table("scans")
            .update({
                "status": "failed"
            })
            .eq(
                "id",
                scan_id
            )
            .execute()
        )

        raise
