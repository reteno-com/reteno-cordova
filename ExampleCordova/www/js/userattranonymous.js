const fnameInput = document.querySelector("#input-first-name");
const lnameInput = document.querySelector("#input-last-name");
const langInput = document.querySelector("#input-lang");
const tzInput = document.querySelector("#input-timezone");
const regionInput = document.querySelector("#input-region");
const townInput = document.querySelector("#input-town");
const addressInput = document.querySelector("#input-address");
const postcodeInput = document.querySelector("#input-postcode");

const cancelBtn = document.querySelector("#btn-cancel");
const confirmBtn = document.querySelector("#btn-confirm");
const alertCtrl = document.querySelector("ion-alert-controller");

const clear = () => {
  fnameInput.value = "";
  lnameInput.value = "";
  langInput.value = "";
  tzInput.value = "";
  townInput.value = "";
  addressInput.value = "";
  postcodeInput.value = "";
};

//const onDeviceReady = () => {

confirmBtn.addEventListener("click", () => {
  let address = {
    region: regionInput.value,
    town: townInput.value,
    address: addressInput.value,
    postcode: postcodeInput.value,
  };

  let userAttributes = {
    firstName: fnameInput.value,
    lastName: lnameInput.value,
    languageCode: langInput.value,
    timeZone: tzInput.value,
    address: address,
  };

  let payload = {
    user: { userAttributes },
  };

  clear();
  console.log(JSON.stringify(payload));

  RetenoPlugin.setAnonymousUserAttributes(
    payload,
    function (msg) {},
    function (err) {}
  );
});

cancelBtn.addEventListener("click", clear);
//}

//document.addEventListener("deviceready", onDeviceReady, false);
