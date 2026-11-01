from .supabase import supabase

def get_recommendations(scan_id: str, budget: int):

    # 1. GET DETECTED ITEMS

    scan_response = (
        supabase
        .table("scan_items")
        .select("object_name, quantity")
        .eq("scan_id", scan_id)
        .execute()
    )

    scan_items = scan_response.data or []

    if not scan_items:
        return {
            "status": "no_items",
            "message": "No detected furniture items were found.",
            "target_budget": budget,
            "recommendations": []
        }

    # ==================================================
    # 2. GET CATALOG OPTIONS FOR EACH DETECTED OBJECT
    # ==================================================

    detected_items = []

    for scan_item in scan_items:

        object_name = scan_item["object_name"]
        quantity = scan_item["quantity"]

        catalog_response = (
            supabase
            .table("market_items")
            .select("""
                id,
                object_name,
                variant,
                description,
                material,
                style,
                quality_tier,
                min_price,
                typical_price,
                max_price
            """)
            .ilike("object_name", object_name)
            .order("min_price", desc=False)
            .execute()
        )

        catalog_options = catalog_response.data or []

        detected_items.append({
            "object_name": object_name,
            "quantity": quantity,
            "options": catalog_options
        })

    # ==================================================
    # 3. CALCULATE CURRENT LOOK ESTIMATE
    #
    # IMPORTANT:
    #
    # - min_price     = lower bound
    # - typical_price = primary estimate
    # - max_price     = upper bound
    #
    # We use TYPICAL to determine whether the current
    # look fits the user's budget.
    # ==================================================

    current_min = 0
    current_typical = 0
    current_max = 0

    for item in detected_items:

        options = item["options"]
        quantity = item["quantity"]

        if not options:
            continue

        item_min = min(
            float(option["min_price"])
            for option in options
        )

        item_typical = round(
            sum(
                float(option["typical_price"])
                for option in options
            ) / len(options)
        )

        item_max = max(
            float(option["max_price"])
            for option in options
        )

        current_min += item_min * quantity
        current_typical += item_typical * quantity
        current_max += item_max * quantity

    # ==================================================
    # 4. BUDGET FITS
    #
    # The EXISTING look fits if the user's budget is
    # greater than or equal to the typical estimate.
    #
    # Example:
    #
    # budget = 2,000,000
    # typical = 1,824,999
    #
    # => budget_fits
    # ==================================================

    if budget >= current_typical:

        return {
            "status": "budget_fits",

            "message": (
                "Your budget already covers "
                "the estimated cost of this look."
            ),

            "target_budget": budget,

            "estimated_cost": {
                "min": current_min,
                "typical": current_typical,
                "max": current_max
            },

            "budget_remaining": (
                budget - current_typical
            ),

            "cheapest_possible_total": None,

            "additional_budget_needed": None,

            "recommendations": []
        }

    # ==================================================
    # 5. FIND CHEAPEST ALTERNATIVES
    #
    # IMPORTANT:
    #
    # Here we switch to MIN prices.
    #
    # Why?
    #
    # We want to answer:
    #
    # "Can I replace the detected items with cheaper
    # catalog versions and get the look within this
    # budget?"
    #
    # Therefore the cheapest possible replacement
    # uses min_price.
    # ==================================================

    recommendations = []

    cheapest_possible_total = 0

    for item in detected_items:

        object_name = item["object_name"]
        quantity = item["quantity"]
        options = item["options"]

        # --------------------------------------------------
        # No catalog data
        # --------------------------------------------------

        if not options:

            recommendations.append({
                "object_name": object_name,
                "quantity": quantity,
                "status": "no_catalog_data",
                "message": (
                    f"No catalog options were found "
                    f"for {object_name}."
                ),
                "recommended": None,
                "alternatives": []
            })

            continue

        # --------------------------------------------------
        # Find cheapest option by MINIMUM price
        # --------------------------------------------------

        cheapest_option = min(
            options,
            key=lambda option: float(option["min_price"])
        )

        cheapest_unit_min = float(
            cheapest_option["min_price"]
        )

        cheapest_total_min = (
            cheapest_unit_min * quantity
        )

        cheapest_possible_total += cheapest_total_min

        # --------------------------------------------------
        # Build all alternatives
        # --------------------------------------------------

        alternatives = []

        for option in options:

            unit_min = float(option["min_price"])
            unit_typical = float(option["typical_price"])
            unit_max = float(option["max_price"])

            total_min = unit_min * quantity
            total_typical = unit_typical * quantity
            total_max = unit_max * quantity

            alternatives.append({
                "catalog_id": option["id"],

                "variant": option["variant"],

                "description": option["description"],

                "material": option["material"],

                "style": option["style"],

                "quality_tier": option["quality_tier"],

                "price": {
                    "min": unit_min,
                    "typical": unit_typical,
                    "max": unit_max
                },

                "estimated_total": {
                    "min": total_min,
                    "typical": total_typical,
                    "max": total_max
                }
            })

        # --------------------------------------------------
        # Sort cheapest first
        # --------------------------------------------------

        alternatives.sort(
            key=lambda alternative:
                alternative["estimated_total"]["min"]
        )

        # --------------------------------------------------
        # Mark cheapest option as recommended
        # --------------------------------------------------

        recommended = alternatives[0]

        # --------------------------------------------------
        # Return top 3 alternatives
        # --------------------------------------------------

        alternatives = alternatives[:3]

        recommendations.append({
            "object_name": object_name,
            "quantity": quantity,
            "status": "alternatives_available",

            "recommended": recommended,

            "alternatives": alternatives
        })

    # ==================================================
    # 6. DETERMINE WHETHER CHEAPEST ALTERNATIVES FIT
    #
    # We compare the budget against the CHEAPEST
    # POSSIBLE combination using min_price.
    # ==================================================

    if cheapest_possible_total <= budget:

        overall_status = "recommendations_available"

        overall_message = (
            "We found alternatives that can help "
            "you get closer to your target budget."
        )

        additional_budget_needed = 0

    else:

        overall_status = "budget_too_low"

        overall_message = (
            "We couldn't get the entire look within "
            "your budget, but here are the cheapest "
            "available alternatives."
        )

        additional_budget_needed = (
            cheapest_possible_total - budget
        )

    # ==================================================
    # 7. RETURN RESULT
    # ==================================================

    return {
        "status": overall_status,

        "message": overall_message,

        "target_budget": budget,

        "estimated_cost": {
            "min": current_min,
            "typical": current_typical,
            "max": current_max
        },

        "cheapest_possible_total": cheapest_possible_total,

        "additional_budget_needed": additional_budget_needed,

        "budget_difference_from_typical": (
            current_typical - budget
        ),

        "recommendations": recommendations
    }