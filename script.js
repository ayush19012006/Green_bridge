// Load existing items from local storage
document.addEventListener("DOMContentLoaded", loadItems);

function addItem() {
    let name = document.getElementById("itemName").value;
    let price = document.getElementById("itemPrice").value;

    if (name && price) {
        let items = JSON.parse(localStorage.getItem("items")) || [];
        items.push({ name, price });
        localStorage.setItem("items", JSON.stringify(items));

        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";

        loadItems();
    }
}

function loadItems() {
    let farmerItems = document.getElementById("farmerItems");
    let consumerItems = document.getElementById("consumerItems");

    if (farmerItems) farmerItems.innerHTML = "";
    if (consumerItems) consumerItems.innerHTML = "";

    let items = JSON.parse(localStorage.getItem("items")) || [];
    
    items.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ₹${item.price} 
        <button onclick="buyItem(${index})">Buy</button>`;

        if (farmerItems) farmerItems.appendChild(li);
        if (consumerItems) consumerItems.appendChild(li.cloneNode(true));
    });
}

function buyItem(index) {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    let totalSales = parseInt(localStorage.getItem("totalSales")) || 0;

    totalSales += parseInt(items[index].price);
    localStorage.setItem("totalSales", totalSales);

    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));

    alert("Item purchased successfully!");
    loadItems();
}

if (document.getElementById("totalSales")) {
    document.getElementById("totalSales").textContent = localStorage.getItem("totalSales") || 0;
}
