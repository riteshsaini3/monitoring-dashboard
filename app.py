from flask import Flask, jsonify, render_template
import psutil
import time

app = Flask(__name__)

@app.route("/")
def dashboard():
    return render_template("index.html")


@app.route("/metrics")
def metrics():
    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().percent
    disk = psutil.disk_usage('/').percent
    net = psutil.net_io_counters()

    return jsonify({
        "cpu": cpu,
        "memory": memory,
        "disk": disk,
        "bytes_sent": net.bytes_sent,
        "bytes_recv": net.bytes_recv,
        "time": time.strftime("%H:%M:%S")
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
