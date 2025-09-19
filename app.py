
from flask import Flask, render_template, request, jsonify
import openai


openai.api_key = "OPEN_API_KEY"

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_msg = data.get("message", "")

    if user_msg.strip().lower() == "":
        reply = "Hi! What can I do for you?"
    else:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful agricultural assistant."},
                {"role": "user", "content": user_msg}
            ]
        )
        reply = response["choices"][0]["message"]["content"]

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)




