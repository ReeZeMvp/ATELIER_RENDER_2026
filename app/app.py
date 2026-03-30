from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask + Docker + GHCR + Terraform + Render"

@app.route("/health")
def health():
    return {"status": "Tout est ok ou pas"}

@app.route("/info")
def info():
    return {
        "app": "Flask Render",
        "student": "Pénélope FILLON",  # remplace par ton nom
        "version": "v1"
    }

@app.route("/env")
def env():
    return {"env": os.getenv("ENV")}

@app.route("/db")
def db_check():
    return {"database_url_set": bool(os.getenv("DATABASE_URL"))} # Pour débug et check si la DB_URL est OK

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
