var postData;
document.getElementById('loader').style.display="none"
function handleSubmit(event) {
    document.getElementById('loader').style.display=""
    
  let inputURl = document.getElementById("url").value;
  let token = document.getElementById("token").value;

  console.log(inputURl);
  const url = encodeURIComponent(inputURl);
  const options = {
    hostname: "api.proxycrawl.com",
    path: "/?token=" + token + "&get_cookies=true&url=" + url,
  };

  //ExA-61VCblXYDniQ_L244Q
  const url2 = "https://api.proxycrawl.com/scraper" + options.path + url;

  event.preventDefault();
  try {
    fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.body);
        postData = {
          name: data.body.name,
          brand: data.body.brand,
          customerReview: data.body.customerReview,
          description: data.body.description,
          images: data.body.mainImage,
          price: data.body.price,
          canonicalUrl: data.body.canonicalUrl,
        };
        let newData = {};
        newData["data2"] = postData;

        console.log(postData);
        chrome.storage.sync.clear();
        chrome.storage.sync.set(newData, () => {
          if (data.original_status === 200) {
            openOptionPage();
          }
        });
      });
  } catch (error) {
    alert(error);
  }
}

const form = document.getElementById("form");

form.addEventListener("submit", handleSubmit);

function openOptionPage() {
  var optionsUrl = chrome.extension.getURL("templates/options.html");
  chrome.tabs.query({ url: optionsUrl }, function (tabs) {
    if (tabs.length) {
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      chrome.tabs.create({ url: optionsUrl });
    }
  });
}
