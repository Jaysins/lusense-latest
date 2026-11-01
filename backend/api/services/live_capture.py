from PIL import Image

from .vision import analyze_image
from .pricing import get_market_price


def analyze_live_capture(image: Image.Image):

    # 1. RUN VISION / YOLO

    vision_result = analyze_image(image)

    detections = vision_result.get(
        "detections",
        []
    )

    counts = vision_result.get(
        "counts",
        {}
    )

    image_size = vision_result.get(
        "image_size"
    )

    # 2. CHECK WHETHER ANYTHING WAS DETECTED

    if not counts:

        return {
            "status": "unable_to_analyze",

            "message": (
                "Unable to detect any supported "
                "furniture or objects in this image."
            ),

            "image_size": image_size,

            "detections": [],

            "items": [],

            "estimated_total": {
                "min": 0,
                "typical": 0,
                "max": 0
            }
        }

    # 3. PROCESS DETECTED ITEMS

    analyzed_items = []

    total_min = 0
    total_typical = 0
    total_max = 0

    for object_name, quantity in counts.items():

        # Get market pricing

        market_options = get_market_price(
            object_name
        )

        # Object detected but we don't have pricing

        if not market_options:

            analyzed_items.append({
                "object_name": object_name,
                "quantity": quantity,
                "price": None
            })

            continue

        # Calculate price range

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

        # Calculate totals for this object

        item_total_min = (
            min_price * quantity
        )

        item_total_typical = (
            typical_price * quantity
        )

        item_total_max = (
            max_price * quantity
        )

        # Add to room total

        total_min += item_total_min
        total_typical += item_total_typical
        total_max += item_total_max

        # Add item response

        analyzed_items.append({
            "object_name": object_name,

            "quantity": quantity,

            "price": {
                "min": min_price,
                "typical": typical_price,
                "max": max_price
            }
        })

    # 4. RETURN LIVE ANALYSIS

    return {
        "status": "analyzed",

        "message": (
            "Image analyzed successfully."
        ),

        "image_size": image_size,

        "detections": detections,

        "items": analyzed_items,

        "estimated_total": {
            "min": total_min,
            "typical": total_typical,
            "max": total_max
        }
    }
