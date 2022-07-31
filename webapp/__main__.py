from webapp.app import app

if __name__ == "__main__":
    # https://stackoverflow.com/questions/9449101/how-to-stop-flask-from-initialising-twice-in-debug-mode
    # app.run(debug=True, use_reloader=False, host="127.0.0.1")
    app.run(debug=True, host="0.0.0.0", port=5000)
