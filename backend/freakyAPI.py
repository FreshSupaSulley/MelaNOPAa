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
        print(result[0])
        print(sum(result[0]))
        max_prob = max(result[0])
        class_ind = result[0].index(max_prob)
        print(class_ind)
        return jsonify({
            "actinic keratoses and intraepithelial carcinomae(Cancer)": result[0][0],
            "basal cell carcinoma(Cancer)": result[0][1],
            "benign keratosis-like lesions(Non-Cancerous)": result[0][2],
            "dermatofibroma(Non-Cancerous)": result[0][3],
            "melanocytic nevi(Non-Cancerous)": result[0][4],
            "pyogenic granulomas and hemorrhage(Can lead to cancer)": result[0][5],
            "melanoma(Cancer)": result[0][6],
        })
    
if __name__ == '__main__':
   app.run(port=5000)