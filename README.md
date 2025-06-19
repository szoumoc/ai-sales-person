Tech Stack
- Language: Python
- AI Engine: Gemini AI
- Communication: Twilio (Voice & SMS)
- Frameworks: Flask, FastAPI
- Database: MongoDB
- Deployment Ready
Features
- AI-powered voice call response
- SMS-based intelligent conversations
- Gemini AI-driven context-aware replies
- Flask routes for quick testing
- FastAPI endpoints for async performance
- MongoDB storage for user interaction logs
Project Structure
AIvoicecallnsms/
 app/
 ai_agent.py
 call_handler.py
 sms_handler.py
 db.py
 utils.py
 main.py
 requirements.txt
 README.md
Setup Instructions
1. Clone the repo
 git clone https://github.com/szoumoc/AIvoicecallnsms.git
 cd AIvoicecallnsms
2. Install dependencies
 pip install -r requirements.txt
3. Set environment variables (.env file):
 GEMINI_API_KEY=...
 TWILIO_ACCOUNT_SID=...
 TWILIO_AUTH_TOKEN=...
 TWILIO_PHONE_NUMBER=...
 MONGODB_URI=...
4. Run the server
 uvicorn main:app --reload
Twilio Webhooks Setup
Voice Call: 
SMS Handler: 
Use ngrok for local testing.
AI Agent Logic
Uses Gemini AI to understand incoming messages or calls.
Maintains basic context and responds with human-like answers.
Extendable to tasks like appointment booking, surveys, and support.
Use Cases
- Customer support bots
- Appointment scheduling
- Smart notifications
- Lead qualification
