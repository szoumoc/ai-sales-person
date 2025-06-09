from flask import Flask, request, Response
from twilio.twiml.voice_response import VoiceResponse
from twilio.twiml.messaging_response import MessagingResponse
from gpt_service import get_gpt_response
from mongodb_log import log_interaction
import os

app = Flask(__name__)

@app.route("/voice", methods=["POST"])
def voice():
    if "SpeechResult" not in request.form:
        # First call: ask for speech input
        response = VoiceResponse()
        gather = response.gather(input="speech", action="/voice", method="POST")
        gather.say("Hello! Please tell me how I can assist you today.")
        return Response(str(response), mimetype='application/xml')

    # Second call: after speech is transcribed
    speech_text = request.form.get("SpeechResult")
    caller = request.form.get("From")

    gpt_reply = get_gpt_response(speech_text)
    log_interaction(caller, speech_text, gpt_reply)

    response = VoiceResponse()
    response.say(gpt_reply)
    return Response(str(response), mimetype='application/xml')

@app.route("/sms", methods=["POST"])
def sms_reply():
    message_text = request.form.get("Body")
    sender = request.form.get("From")

    if not message_text:
        return "No message received"

    gpt_reply = get_gpt_response(message_text)
    log_interaction(sender, message_text, gpt_reply)

    response = MessagingResponse()
    response.message(gpt_reply)
    return Response(str(response), mimetype='application/xml')


if __name__ == "__main__":
    app.run(debug=True)