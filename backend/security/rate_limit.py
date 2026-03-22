from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address


RATE_LIMIT = "10/minute"

# Shared limiter for endpoint decorators, keyed by client IP.
limiter = Limiter(key_func=get_remote_address, default_limits=[RATE_LIMIT])


def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
	return JSONResponse(
		status_code=429,
		content={"detail": "Rate limit exceeded. Try again later."},
	)


def init_rate_limiter(app: FastAPI) -> None:
	app.state.limiter = limiter
	app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)
	app.add_middleware(SlowAPIMiddleware)
