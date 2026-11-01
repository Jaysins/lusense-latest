import os

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv


from api.services.auth import sign_up, sign_in

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")

router = APIRouter(prefix="/auth",tags=["auth"])

class AuthRequest(BaseModel):
    email: str
    password: str


@router.post("/signup")
def signup(data: AuthRequest):
    try:
        response = sign_up(
            data.email,
            data.password,
            options={
                "email_redirect_to": f"{FRONTEND_URL}/auth/callback"
            }
        )

        return {
            "message": "Account created successfully. "
            "Sign in if a session was issued; otherwise follow the email confirmation settings of your Supabase project.",
            "user_id": response.user.id if response.user else None,
            "email": response.user.email if response.user else None,
            "session": response.session is not None,
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login")
def login(data: AuthRequest):
    try:
        response = sign_in(
            data.email,
            data.password
        )

        return {
            "message": "Login successful",
            "user_id": response.user.id,
            "email": response.user.email,
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
        }

    except Exception as e:
        error_message = str(e)
        print(f"Login error: {error_message}")

        if "Email not confirmed" in error_message:
            raise HTTPException(
                status_code=403,
                detail="Please confirm your email address before logging in."
            )

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
