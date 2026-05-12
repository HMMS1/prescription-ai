# Backend Integration TODO

Current frontend works with localStorage as a temporary mock until backend is ready.
Replace the mock logic with these endpoints:

## Auth
- POST /api/auth/register/user/
  - fullName, email, password
- POST /api/auth/login/
  - email_or_username, password
  - response: token, user { id, name, role }

## Super Admin
- Store fixed Super Admin credentials safely in backend environment variables or database.
- POST /api/superadmin/pharmacies/
  - doctorName, pharmacyName, address, phone, whatsapp, username, email, password
- GET /api/superadmin/pharmacies/
- DELETE /api/superadmin/pharmacies/:id/

## Contracted Pharmacies
- GET /api/pharmacies/contracted/

## Chat
- GET /api/chats/:pharmacyId/messages/
- POST /api/chats/:pharmacyId/messages/
  - text
- Optional real-time later: WebSocket /ws/chats/:chatId/
