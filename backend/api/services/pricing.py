from .supabase import supabase

# FIND MARKET PRICE
def get_market_price(object_name: str, token: str | None = None):
    from supabase import create_client
    import os
    client = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])
    if token: client.postgrest.auth(token)

    response = (
        client
        .table("market_items")
        .select("""
            id,
            object_name,
            category,
            variant,
            description,
            material,
            style,
            quality_tier,
            min_price,
            typical_price,
            max_price,
            market_location,
            shop_name,
            shop_details,
            source,
            last_verified_at
        """)
        .ilike("object_name", object_name)
        .execute()
    )

    return response.data

# TEMPORARY TEST
if __name__ == "__main__":

    result = get_market_price("accent chair")

    print(result)
