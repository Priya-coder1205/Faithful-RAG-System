from fastapi import FastAPI
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

# Rate Limiting
app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)
app.add_middleware(SlowAPIMiddleware)

# Main RAG Routes
# This brings back /upload and /query
app.include_router(router)

# Authentication Routes
# This gives /auth/signup and /auth/login
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

# CORS
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

# Health Check
@app.get("/health")
def health_check():
    return {"status": "ok"}