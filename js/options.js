var data;
chrome.storage.sync.get(null, function (value) {
  console.log("hemkjdcnkjnc", value);
  data = value;
  console.log("===>", data.data2.images);

  var img = document.createElement("img");

  img.src = data.data2.images;
  var src = document.getElementById("x");

  src.appendChild(img);

  var brand = document.getElementById("brand");
  brand.innerText = data.data2.brand;

  var name = document.getElementById("name");
  name.innerText = data.data2.name;

  var description = document.getElementById("description");
  description.innerText = data.data2.description;

  var customerReview = document.getElementById("customerReview");
  customerReview.innerText = data.data2.customerReview;

  var price = document.getElementById("price");
  price.innerText = data.data2.price;
  
  var a = document.createElement("sitelink");

  document.getElementById("sitelink").href = data.data2.canonicalUrl;


});

