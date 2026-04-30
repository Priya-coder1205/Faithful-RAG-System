from typing import Dict

from fastapi import APIRouter, HTTPException, status

from security.auth import create_access_token
from security.hashing import hash_password, verify_password
from security.schemas import LoginRequest, SignupRequest, SignupResponse, TokenResponse


router = APIRouter(tags=["Authentication"])

# In-memory user store for development purposes.
users_db: Dict[str, Dict[str, str]] = {}


@router.post("/signup", response_model=SignupResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest) -> SignupResponse:
	email = payload.email.strip().lower()

	if email in users_db:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Email is already registered",
		)

	users_db[email] = {
		"email": email,
		"password_hash": hash_password(payload.password),
	}

	return SignupResponse(message="User created successfully", email=email)


from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm


@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()) -> TokenResponse:
    email = form_data.username.strip().lower()   # Swagger sends "username"
    password = form_data.password

    stored_user = users_db.get(email)

    if not stored_user or not verify_password(password, stored_user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token({"sub": email})
    return TokenResponse(access_token=access_token, token_type="bearer")
