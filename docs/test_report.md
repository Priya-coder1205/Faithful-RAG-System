# API Test Report

## Environment
- Server: http://127.0.0.1:8000
- Tool: Swagger UI

## Test Cases

### 1. Signup
- Endpoint: POST /auth/signup
- Input: email + password
- Result: 201 Created ✅

### 2. Login
- Endpoint: POST /auth/login
- Input: username(email) + password (form-data)
- Result: Token returned ✅

### 3. Unauthorized Query
- Endpoint: POST /query
- Without token
- Result: 401 Not authenticated ✅

### 4. Authorized Query
- With Bearer token (via Authorize)
- Result: Answer + citations + confidence ✅

### 5. Rate Limiting
- >10 requests/minute
- Result: 429 Too Many Requests ✅

### 6. Upload + Query Flow
- Upload document → build index
- Query after upload
- Result: Relevant answer returned ✅

## Conclusion
All critical flows (auth, protection, rate limiting, RAG pipeline) are functioning correctly.