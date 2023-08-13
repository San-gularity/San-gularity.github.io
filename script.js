// JavaScript code for Food Sharing Calculator

const foodAndPrice = {};
const peopleOrders = {};

document.addEventListener("DOMContentLoaded", () => {
  const addFoodButton = document.getElementById("addFood");
  const foodTable = document.getElementById("foodTable");
  const addPersonButton = document.getElementById("addPerson");
  const ordersTable = document.getElementById("ordersTable");
  const sharesTable = document.getElementById("sharesTable");

  addFoodButton.addEventListener("click", () => addFood(foodTable));
  addPersonButton.addEventListener("click", () => addPersonOrder(ordersTable));
  updateFoodTable(foodTable);
  updateOrdersTable(ordersTable);
  updateSharesTable(sharesTable);
});

function addFood(table) {
  const foodItemInput = document.getElementById("foodItem");
  const foodPriceInput = document.getElementById("foodPrice");
  const foodItem = foodItemInput.value;
  const foodPrice = parseFloat(foodPriceInput.value);

  if (foodItem && !isNaN(foodPrice)) {
    foodAndPrice[foodItem] = foodPrice;
    updateFoodTable(table);
    updateFoodDropdown();
    updateSharesTable(sharesTable);
    foodItemInput.value = "";
    foodPriceInput.value = "";
  } else {
    alert("Please enter valid food item and price.");
  }
  // const removeButton = document.createElement("button");
  // removeButton.textContent = "Remove";
  // removeButton.addEventListener("click", () => removeFoodItem(foodItem, table));
  // table.appendChild(removeButton);
}

function removeFoodItem(foodItem, table) {
  delete foodAndPrice[foodItem];
  updateFoodTable(table);
  updateFoodDropdown();
  updateSharesTable(sharesTable);
}

function updateFoodTable(table) {
  let html =
    "<table><tr><th>Serial No.</th><th>Food Item</th><th>Price</th><th></th></tr>";
  let serialNumber = 0;
  for (const food in foodAndPrice) {
    html += `<tr><td>${serialNumber}</td><td>${food}</td><td>${foodAndPrice[food]}</td><td><button class="remove-button" data-key="${food}">Remove</button></td></tr>`;
    serialNumber++;
  }
  html += "</table>";
  table.innerHTML = html;
  addRemoveListeners(table);
}

function updateFoodDropdown() {
  const foodDropdown = document.getElementById("foodDropdown");
  foodDropdown.innerHTML = "";
  for (const food in foodAndPrice) {
    const option = document.createElement("option");
    option.value = food;
    option.text = food;
    foodDropdown.appendChild(option);
  }
}

function addPersonOrder(table) {
  const personNameInput = document.getElementById("personName");
  const foodDropdown = document.getElementById("foodDropdown");
  const personName = personNameInput.value;
  const selectedOptions = Array.from(foodDropdown.selectedOptions).map(
    (option) => option.value
  );

  if (personName && selectedOptions.length > 0) {
    peopleOrders[personName] = selectedOptions;
    updateOrdersTable(table);
    updateSharesTable(sharesTable);
    personNameInput.value = "";
    resetFoodDropdown();
  } else {
    alert(
      "Please enter valid person's name and select at least one food item."
    );
  }
  // const removeButton = document.createElement("button");
  // removeButton.textContent = "Remove";
  // removeButton.addEventListener("click", () => removePersonOrder(personName, table));
  // table.appendChild(removeButton);
}

function removePersonOrder(personName, table) {
  delete peopleOrders[personName];
  updateOrdersTable(table);
  updateSharesTable(sharesTable);
}

function updateOrdersTable(table) {
  let html = "<table><tr><th>Person</th><th>Food Orders</th><th></th></tr>";
  for (const person in peopleOrders) {
    const orders = peopleOrders[person].join(", ");
    html += `<tr><td>${person}</td><td>${orders}</td><td><button class="remove-button" data-key="${person}">Remove</button></td></tr>`;
  }
  html += "</table>";
  table.innerHTML = html;
  addRemoveListeners(table);
}

function addRemoveListeners(table) {
  const removeButtons = table.getElementsByClassName("remove-button");
  for (const button of removeButtons) {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-key");
      if (foodAndPrice[key] !== undefined) {
        delete foodAndPrice[key];
        updateFoodTable(document.getElementById("foodTable"));
      } else if (peopleOrders[key] !== undefined) {
        delete peopleOrders[key];
        updateOrdersTable(document.getElementById("ordersTable"));
      }
      updateSharesTable(sharesTable);
    });
  }
}

function resetFoodDropdown() {
  const foodDropdown = document.getElementById("foodDropdown");
  for (const option of foodDropdown.options) {
    option.selected = false;
  }
}

function updateSharesTable(table) {
  const individualShares = calculateShares();
  let html = "<table><tr><th>Person</th><th>Individual Share</th></tr>";
  for (const person in individualShares) {
    const share = individualShares[person].toFixed(2);
    html += `<tr><td>${person}</td><td>$${share}</td></tr>`;
  }
  html += "</table>";
  table.innerHTML = html;
}

function calculateShares() {
  const individualShares = {};
  for (const person in peopleOrders) {
    individualShares[person] = 0;
    for (const item of peopleOrders[person]) {
      if (foodAndPrice[item]) {
        const sharePerPerson =
          foodAndPrice[item] /
          Object.keys(peopleOrders).filter((p) =>
            peopleOrders[p].includes(item)
          ).length;
        individualShares[person] += sharePerPerson;
      }
    }
  }
  return individualShares;
}
