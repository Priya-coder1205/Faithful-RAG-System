from typing import Any, Dict, Optional

from fastapi import Depends, Header, HTTPException, status

from security.auth import verify_token
from security.roles import require_admin


def get_current_user(token: Optional[str] = Header(default=None, alias="Authorization")) -> Dict[str, Any]:
	if not token:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Authorization header is missing",
		)

	scheme, _, credentials = token.partition(" ")
	if scheme.lower() != "bearer" or not credentials:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid authorization header format",
		)

	return verify_token(credentials)


def get_current_admin(user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
	require_admin(user.get("role"))
	return user
