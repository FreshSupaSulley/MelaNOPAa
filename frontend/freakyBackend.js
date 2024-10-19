export async function uploadImage(img){
    const formData = new FormData();
    formData.append('file', img);

    let res = await fetch("http://localhost:5000/freakyPics", {
        method: 'POST',
        headers: {
            "content-type": 'application/json'
        },
        body: formData
    });
    let obj = await res.json();
    return obj;
}