from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import skin_cancer_detection as SCD

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "downloads/"

@app.route('/freakyPics', methods=['POST'])
def home():
    if(request.method == 'POST'):
        file = request.files['file']
        inputimg = Image.open(file)
        inputimg = inputimg.resize((28, 28))
        img = np.array(inputimg).reshape(-1, 28, 28, 3)
        result = SCD.model.predict(img)

        result = result.tolist()
        print(result)
        max_prob = max(result[0])
        class_ind = result[0].index(max_prob)
        print(class_ind)
        result = SCD.classes[class_ind]
        return jsonify({'message': result})
    
if __name__ == '__main__':
   app.run(port=5000)