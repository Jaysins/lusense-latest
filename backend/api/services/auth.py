from .supabase import supabase

def sign_up(email: str, password: str):
    response = supabase.auth.sign_up({
        "email": email,
        "password": password,
    })

    return response


def sign_in(email: str, password: str):
    response = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password,
    })

    return response
