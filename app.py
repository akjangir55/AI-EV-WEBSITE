"""
EcoDrive EV - Flask Chatbot Backend

This is a simple educational demonstration backend.

Run locally:

    pip install -r requirements.txt
    python app.py

The chatbot API will be available at:

    http://127.0.0.1:5000/api/chat
"""

from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------
#
# GitHub Pages is a different origin from the Flask server.
# Flask-CORS allows the GitHub Pages frontend to call this API.
#
# For this educational demo, all origins are allowed.
#
# In a production application, replace "*" with your
# actual GitHub Pages domain.
#

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)


# ---------------------------------------------------------
# CHATBOT RESPONSE FUNCTION
# ---------------------------------------------------------

def get_chat_response(message):

    text = message.lower().strip()


    # Greetings

    if any(word in text for word in [
        "hi",
        "hello",
        "hey",
        "namaste"
    ]):

        return (
            "Welcome to EcoDrive Agent Support! "
            "How may I help you?"
        )


    # EcoDrive

    if (
        "ecodrive" in text
        or "overview" in text
        or "about" in text
    ):

        return (
            "EcoDrive EV is a fictional educational concept "
            "for futuristic electric mobility. It combines "
            "electric performance, smart technology, connected "
            "services and modern charging concepts."
        )


    # Features

    if any(word in text for word in [
        "feature",
        "performance",
        "technology",
        "smart"
    ]):

        return (
            "EcoDrive features include instant electric "
            "performance, energy efficiency, connected "
            "technology, digital interfaces and smart "
            "mobility concepts."
        )


    # Charging

    if any(word in text for word in [
        "charge",
        "charging",
        "battery",
        "charger"
    ]):

        return (
            "EcoDrive includes a fictional 11 kW home "
            "charging concept and fast charging designed "
            "to reach approximately 80% in 30 minutes. "
            "The figures are for educational demonstration."
        )


    # Test drive

    if any(phrase in text for phrase in [
        "test drive",
        "test-drive",
        "book",
        "drive"
    ]):

        return (
            "You can submit a test-drive request from the "
            "Contact page. Select Contact → Book a Test Drive."
        )


    # Contact

    if any(word in text for word in [
        "contact",
        "support",
        "customer"
    ]):

        return (
            "For this demonstration, customer support is "
            "available through the EcoDrive Agent interface. "
            "You can also use the Contact page."
        )


    # Help

    if (
        "help" in text
        or "what can you do" in text
    ):

        return (
            "I can help with EcoDrive, Features, Charging, "
            "Test Drive, Contact and general Help. "
            "Ask me about any of these topics."
        )


    # Default

    return (
        "I can help with EcoDrive, Features, Charging, "
        "Test Drive, Contact and Help. "
        "Please ask me about one of these topics."
    )


# ---------------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------------

@app.get("/")
def home():

    return jsonify({
        "service": "EcoDrive EV Agent",
        "status": "online",
        "message": "EcoDrive chatbot backend is running."
    })


# ---------------------------------------------------------
# CHAT API
# ---------------------------------------------------------

@app.post("/api/chat")
def chat():

    data = request.get_json(
        silent=True
    ) or {}


    message = data.get(
        "message",
        ""
    )


    if not isinstance(message, str):

        return jsonify({
            "error": "Message must be text."
        }), 400


    message = message.strip()


    if not message:

        return jsonify({
            "error": "Please enter a message."
        }), 400


    response = get_chat_response(
        message
    )


    return jsonify({
        "response": response
    })


# ---------------------------------------------------------
# APPLICATION START
# ---------------------------------------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
