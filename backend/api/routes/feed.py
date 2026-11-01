import uuid

from pathlib import Path
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from api.services.supabase import supabase

router = APIRouter()

# UPLOAD IMAGE TO FEED

@router.post("/upload")
async def upload_to_feed(
    file: UploadFile = File(...),
    title: str = Form(...),
    room_type: str = Form(...)
):

    # Validate file typ

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPEG, PNG, and WebP images are allowed."
        )

    try:
        # Read file

        contents = await file.read()

        if not contents:
            raise HTTPException(
                status_code=400,
                detail="Uploaded file is empty."
            )


        # Create unique filename

        extension = Path(
            file.filename or ""
        ).suffix.lower()

        if extension not in {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        }:
            extension = ".jpg"

        unique_filename = (
            f"{uuid.uuid4()}{extension}"
        )

        storage_path = (
            f"feed/{unique_filename}"
        )

        # Upload to Supabase Storage

        (
            supabase.storage
            .from_("room-uploads")
            .upload(
                storage_path,
                contents,
                {
                    "content-type": file.content_type,
                    "upsert": "false"
                }
            )
        )

        # Get public image URL

        image_url = (
            supabase.storage
            .from_("room-uploads")
            .get_public_url(storage_path)
        )

        # Create feed post

        feed_data = {
            "title": title,
            "image_url": image_url,
            "room_type": room_type,
        }

        response = (
            supabase
            .table("feed_posts")
            .insert(feed_data)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=500,
                detail="Failed to create feed post."
            )

        return {
            "message": "Successfully uploaded to LuSense Feed",
            "post": response.data[0]
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}"
        )

# GET PUBLIC FEED

@router.get("")
async def get_public_feed():

    try:

        response = (
            supabase
            .table("feed_posts")
            .select(
                "id, title, image_url, room_type, created_at"
            )
            .order(
                "created_at",
                desc=True
            )
            .limit(20)
            .execute()
        )

        return {
            "feed": response.data or []
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch feed: {str(e)}"
        )
