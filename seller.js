const storage = firebase.storage();

// Add Product
async function addProduct(){
  let name = document.getElementById("name").value;
  let price = parseInt(document.getElementById("price").value);
  let stock = parseInt(document.getElementById("stock").value);
  let file = document.getElementById("photo").files[0];

  let storageRef = storage.ref("products/"+file.name);
  await storageRef.put(file);
  let imageUrl = await storageRef.getDownloadURL();

  db.collection("products").add({
    name:name,
    price:price,
    stock:stock,
    image:imageUrl,
    seller:auth.currentUser.uid
  });

  alert("Product added!");
}
