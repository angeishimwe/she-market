let cart=[];

db.collection("products").onSnapshot(snapshot=>{
  let html="";
  snapshot.forEach(doc=>{
    let p = doc.data();
    html+=`
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>Price: ${p.price} RWF</p>
        <p>Stock: ${p.stock}</p>
        <button onclick="addToCart('${doc.id}',${p.stock})">Add to Cart</button>
      </div>
    `;
  });
  document.getElementById("products").innerHTML = html;
});

function addToCart(productId, stock){
  if(stock<=0){ alert("Out of stock!"); return; }
  cart.push(productId);
  alert("Added to cart!");
}

function checkout(){
  cart.forEach(async id=>{
    let docRef = db.collection("products").doc(id);
    let docSnap = await docRef.get();
    let stock = docSnap.data().stock;
    if(stock>0) await docRef.update({stock:stock-1});
  });
  cart=[];
  alert("Purchase complete!");
}
