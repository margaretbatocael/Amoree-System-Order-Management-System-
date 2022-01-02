var OrdDate = document.getElementById("OrderDate");
var ProDesc = document.getElementById("ProductDetails");
var Qtty = document.getElementById("Quantity");
var Cusname = document.getElementById("CustomerName");
var CusAdd = document.getElementById("CustomerAddress");
var ContNo = document.getElementById("CustomerContact");
var ProDesc = document.getElementById("ProductDetails");
var Total = document.getElementById("TotalAmount");
var Stat = document.getElementById("OrderStatus");
var table = document.getElementById("myTable");
var tableBody = document.getElementById("tableBody");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var searchInp = document.getElementById("searchInput");
var closeBtn = document.getElementById("close");
var inputs = document.querySelectorAll(".user-input");
var validateMsg = document.querySelectorAll(".validate");


var x = 1;
var OrderList = [];

// Get Local Storage Orders
getFromLocal();

// Displaying Local Storage Orders
DisplayOrders();

//------------------------Main Functions------------------------

// Add
function AddOrder() {
  if (validate()) {
    addToList();
    addToLocal();
    DisplayOrders();
    clearForm();
  }
}

// Add To List
function addToList() {
  var order = {
    OrderDate: OrdDate.value,
    ProductDetails: ProDesc.value,
    Quantity: Qtty.value,
    CustomerName: Cusname.value,
    CustomerAddress: CusAdd.value,
    CustomerContact: ContNo.value,
    TotalAmount: Total.value,
    OrderStatus: Stat.value
  };
  OrderList.push(order);
}

// Validation
function validate () {
  var a = true;
  for (var i = 0; i < inputs.length; i++) {
    validateMsg[i].style.opacity = "0"
    if (inputs[i].value == "") {
      validateMsg[i].style.opacity = "1";
      a = false;
    }
  }
  return a;

}

// Display
function DisplayOrders() {
  var trs = '';

  for (var i = 0; i < OrderList.length; i++) {
    trs +=
      `
    <tr>
    <td>${i}</td>
    <td>${OrderList[i].OrderDate}</td>
    <td>${OrderList[i].ProductDetails}</td>
    <td>${OrderList[i].Quantity}</td>
    <td>${OrderList[i].CustomerName}</td>
    <td>${OrderList[i].CustomerAddress}</td>
    <td>${OrderList[i].CustomerContact}</td>
    <td>${OrderList[i].TotalAmount}</td>
    <td>${OrderList[i].OrderStatus}</td>
    <td>
      <button class="btn btn-secondary" onclick = "updateForm(${i})"">
        <i class="fas fa-edit" ></i>
      </button>
    </td>
    <td>
      <button class="btn btn-danger" id = "" onclick="ClearOrder(${i})">
        <i class="fas fa-trash"></i>
      </button>
    </td>

  </tr>`

    tableBody.innerHTML = trs;
    addToLocal();

  }
}

// Clear
function ClearOrder(x) {

  OrderList.splice(x, 1);
  tableBody.innerHTML = "";
  addToLocal();
  DisplayOrders();
  switchBtn("toAdd");
  hideCloseBtn();

}

// Update Form
function updateForm(_x) {
  x = _x;
  OrdDate.value = OrderList[x].OrderDate;
  ProDesc.value = OrderList[x].ProductDetails;
  Qtty.value = OrderList[x].Quantity;
  Cusname.value = OrderList[x].CustomerName;
  CusAdd.value = OrderList[x].CustomerAddress;
  ContNo.value = OrderList[x].CustomerContact;
  Total.value = OrderList[x].TotalAmount;
  Stat.value = OrderList[x].OrderStatus;

  closeBtn.style.display = "inline";
  switchBtn("toUpdate");
}

// Update Order
function UpdateOrder() {

  if(validate()) {
    OrderList[x].OrderDate = OrdDate.value;
    OrderList[x].ProductDetails = ProDesc.value;
    OrderList[x].Quantity = Qtty.value;
    OrderList[x].CustomerName = Cusname.value;
    OrderList[x].CustomerAddress = CusAdd.value;
    OrderList[x].CustomerContact = ContNo.value;
    OrderList[x].TotalAmount = Total.value;
    OrderList[x].OrderStatus = Stat.value;

    DisplayOrders();

    switchBtn("toAdd");
  }



}

// Search
function SearchOrder() {
  var highlighted;
  var trs = '';
  for (var i = 0; i < OrderList.length; i++) {
    if (OrderList[i].OrderDate.toLowerCase().includes(searchInp.value.toLowerCase())) {
      var index =OrderList[i].OrderDate.toLowerCase().indexOf(searchInp.value.toLowerCase());
      var searchLength = searchInp.value.length;
      //Highlight Text When Search
      if(searchInp.value != ""){
        highlighted = highlightText(i, index, searchLength);
      } else {
        highlighted = OrderList[i].OrderDate;
      }
      trs +=
        `
      <tr>
      <td>${i}</td>
      <td>${highlighted}</td>
      <td>${OrderList[i].OrderDate}</td>
      <td>${OrderList[i].ProductDetails}</td>
      <td>${OrderList[i].Quantity}</td>
      <td>${OrderList[i].CustomerName}</td>
      <td>${OrderList[i].CustomerAddress}</td>
      <td>${OrderList[i].CustomerContact}</td>
      <td>${OrderList[i].TotalAmount}</td>
      <td>${OrderList[i].OrderStatus}</td>
      <td>
        <button class="btn btn-secondary" onclick = "updateForm(${i})"">
          <i class="fas fa-edit" ></i>
        </button>
      </td>
      <td>
        <button class="btn btn-danger" id = "" onclick="ClearOrder(${i})">
          <i class="fas fa-trash"></i>
        </button>
      </td>

    </tr>`
    }
  }
  tableBody.innerHTML = trs;
}

//--------------------------Support Functions-------------------------

// Add To Local Storage
function addToLocal() {
  localStorage.setItem("allProducts", JSON.stringify(OrderList));
}

// Get From Local Storage
function getFromLocal() {
  var x = localStorage.getItem("allProducts");

  if (x == null) {
    OrderList = [];
  } else {
    OrderList = JSON.parse(x);
  }
}

// Clear Form
function clearForm() {
  OrdDate.value = "";
  ProDesc.value = "";
  Qtty.value = "";
  Cusname.value = "";
  CusAdd.value = "";
  ContNo.value = "";
  Total.value = "";
  Stat.value = "";
}

// Switch Buttons
function switchBtn(x) {
  if (x == "toUpdate") {
    updateBtn.style.display = "inline-block";
    addBtn.style.display = "none";
  }
  if (x == "toAdd") {
    updateBtn.style.display = "none";
    addBtn.style.display = "inline-block"
  }
}

// HighLight Search Text
function highlightText(i, index, length) {
  var x =   `${OrderList[i].OrderDate.slice(0, index)}<span class='highlight'>${OrderList[i].OrderDate.slice(index, index + length)}</span>${OrderList[i].OrderDate.slice(index + length)}`
  return x;

}

// Hide Close Button While clicking
function hideCloseBtn() {
  closeBtn.style.display = "none";
}