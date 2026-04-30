from pydantic import BaseModel


class SignupRequest(BaseModel):
	email: str
	password: str


class LoginRequest(BaseModel):
	email: str
	password: str


class SignupResponse(BaseModel):
	message: str
	email: str


class TokenResponse(BaseModel):
	access_token: str
	token_type: str
