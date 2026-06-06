from flask import Flask, render_template, request, jsonify
from zxcvbn import zxcvbn

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    password = data.get("password")

    result = zxcvbn(password)

    score = result["score"]
    feedback = result["feedback"]
    crack_time = result["crack_times_display"]["offline_fast_hashing_1e10_per_second"]

    strength_levels = [
        "Very Weak",
        "Weak",
        "Fair",
        "Good",
        "Strong"
    ]

    return jsonify({
        "score": score,
        "strength": strength_levels[score],
        "suggestions": feedback["suggestions"],
        "warning": feedback["warning"],
        "crack_time": crack_time
    })

if __name__ == "__main__":
    app.run(debug=True)