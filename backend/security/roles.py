from fastapi import HTTPException, status


ROLE_ADMIN = "admin"
ROLE_USER = "user"


def require_admin(user_role: str) -> None:
	if user_role != ROLE_ADMIN:
		raise HTTPException(
			status_code=status.HTTP_403_FORBIDDEN,
			detail="Admin access required",
		)
