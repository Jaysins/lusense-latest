from fastapi import APIRouter, HTTPException
from api.services.recommendations import (get_recommendations)

router = APIRouter()

# GET RECOMMENDATIONS

@router.post("")
async def recommend(
    scan_id: str,
    budget: int
):

    # Validate budget

    if budget <= 0:

        raise HTTPException(
            status_code=400,
            detail="Budget must be greater than 0."
        )

    try:

        result = get_recommendations(
            scan_id=scan_id,
            budget=budget
        )

        return {
            "message": result.get(
                "message"
            ),

            "scan_id": scan_id,

            "target_budget": budget,

            "status": result.get(
                "status"
            ),

            "estimated_cost": result.get(
                "estimated_cost"
            ),

            "cheapest_possible_total": (
                result.get(
                    "cheapest_possible_total"
                )
            ),

            "additional_budget_needed": (
                result.get(
                    "additional_budget_needed"
                )
            ),

            "budget_difference_from_typical": (
                result.get(
                    "budget_difference_from_typical"
                )
            ),

            "budget_remaining": (
                result.get(
                    "budget_remaining"
                )
            ),

            "recommendations": result.get(
                "recommendations",
                []
            )
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Recommendation failed: {str(e)}"
        )
