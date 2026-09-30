let productName = document.getElementById("productName");
let productSpirit = document.getElementById("productSpirit");
let productMoon = document.getElementById("productMoon");
let saveBtn = document.getElementById("saveBtn");
let message = document.getElementById("message");
let productList = document.getElementById("productList");

let products = [];
let editindex = null;

let savedProducts = localStorage.getItem("products");

if(savedProducts !== null) {
    products = JSON.parse(savedProducts);
}

function saveProducts(){
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts() {
    productList.innerHTML = "";

    products.forEach(function(product, index){
        productList.innerHTML += `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Spirit: ${product.Spirit}</p>
            <p>Moon: ${product.Moon}</p>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        </div>
        `;
    });
}

saveBtn.addEventListener("click", function() {
    let product = {
        name: productName.value,
        Spirit: productSpirit.value,
        Moon: productMoon.value
    };

    if(editindex === null) {
       products.push(product);
       message.textContent = "Product Added Successfully";
    }else {
        products[editindex] = product;
        editindex = null;
        saveBtn.textContent = "save Product";
        message.textContent = "Product Updated Successfully"; 
    }

    saveProducts();
    displayProducts();

    productName.value = "";
    productSpirit.value = "";
    productMoon.value = "";
});

function editProduct(index) {
    productName.value = products[index].name;
    productSpirit.value = products[index].Spirit;
    productMoon.value = products[index].Moon;

    editindex = index; 
    saveBtn.textContent = "Update Product";
}

function deleteProduct(index) {
    products.splice(index, 1);

    saveProducts();
    displayProducts();

    message.textContent = "Product Deleted Successfully";
}

displayProducts();