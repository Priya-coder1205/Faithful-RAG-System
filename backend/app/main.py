from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.api import router
from app.auth_routes import router as auth_router

from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

from security.rate_limit import limiter


app = FastAPI(
    title="Trustworthy Knowledge Intelligence Engine",
    version="1.0.0"
)

# -------------------------------
# Security Headers Middleware
# -------------------------------
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)

    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

    return response


# -------------------------------
# CORS Configuration (IMPORTANT)
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------
# Rate Limiting
# -------------------------------
app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)
app.add_middleware(SlowAPIMiddleware)


# -------------------------------
# Routes
# -------------------------------

# Main RAG routes (/upload, /query)
app.include_router(router)

# Auth routes (/auth/signup, /auth/login)
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)


# -------------------------------
# Health Check
# -------------------------------
@app.get("/health")
def health_check():
    return {"status": "ok"}