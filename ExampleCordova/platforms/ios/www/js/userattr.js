const externalUserInput = document.querySelector('#input-external-user');
const emailInput = document.querySelector('#input-email');
const phoneInput = document.querySelector('#input-phone');
const fnameInput = document.querySelector('#input-first-name');
const lnameInput = document.querySelector('#input-last-name');
const langInput = document.querySelector('#input-lang');
const tzInput = document.querySelector('#input-timezone');
const regionInput = document.querySelector('#input-region');
const townInput = document.querySelector('#input-town');
const addressInput = document.querySelector('#input-address');
const postcodeInput = document.querySelector('#input-postcode');

const cancelBtn = document.querySelector('#btn-cancel');
const confirmBtn = document.querySelector('#btn-confirm');
const alertCtrl = document.querySelector('ion-alert-controller');

const clear = () => {
  externalUserInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  fnameInput.value = '';
  lnameInput.value = '';
  langInput.value = '';
  tzInput.value = '';
  townInput.value = '';
  addressInput.value = '';
  postcodeInput.value = '';
};

//const onDeviceReady = () => {

  confirmBtn.addEventListener('click', () => {
    const enteredExtUserId = externalUserInput.value;

    if (enteredExtUserId.trim().length <= 0) {
      alertCtrl
          .create({
            message: 'Please enter User External Id!',
            header: 'Invalid inputs',
            buttons: ['Ok']
          })
          .then(alertElement => {
            alertElement.present();
          });
      return;
    }

    let address = {
      'region': regionInput.value,
      'town': townInput.value,
      'address': addressInput.value,
      'postcode': postcodeInput.value
    };

    let userAttributes = {
      'phone': phoneInput.value,
      'email': emailInput.value,
      'firstName': fnameInput.value,
      'lastName': lnameInput.value,
      'languageCode': langInput.value,
      'timeZone': tzInput.value,
      'address': address
    };

    let payload = {
      'externalUserId': externalUserInput.value,
      'userAttributes': userAttributes
    };

    clear();
    console.log(JSON.stringify(payload));

    RetenoPlugin.setUserAttributes(payload,
        function (msg) {
        },
        function (err) {
        });

  });

  cancelBtn.addEventListener('click', clear);
//}

//document.addEventListener("deviceready", onDeviceReady, false);