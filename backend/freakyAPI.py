from flask import Flask, request, jsonify

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "downloads/"

@app.route('/freakyPics', methods=['POST'])
def home():
    if(request.method == 'POST'):
        file = request.files['file']
        return jsonify({'message': 'melanoma bitch'})
    
if __name__ == '__main__':
   app.run(port=5000)