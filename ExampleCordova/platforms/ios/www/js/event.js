const eventInput = document.querySelector('#input-event-type');
let newBtn = document.querySelector('#btn-new-param');
const paramList = document.querySelector('#param-list');
const alertCtrl = document.querySelector('ion-alert-controller');
const newParamItem = document.querySelector('#new-param');
const sendEventBtn = document.querySelector('#btn-send-event');

let paramBtn;
let newItem;
let paramArray = [];

const createNewItem = () => {
    newItem = document.createElement('ion-col');
    newItem.setAttribute('id', 'new-param-col');
    newItem.setAttribute('size-md', '6');
    newItem.setAttribute('offset-md', '3');
    const newCard = document.createElement('ion-card');
    const newCardHeader = document.createElement('ion-card-header');
    const newCardTitle = document.createElement('ion-card-title');
    newCardTitle.textContent="Add params";
    const newCardContent = document.createElement('ion-card-content');
    newCardHeader.appendChild(newCardTitle);
    newCard.appendChild(newCardHeader);

    const newItemName = document.createElement('ion-item');
    const newItemNameLabel = document.createElement('ion-label');
    newItemNameLabel.setAttribute('position', 'floating');
    newItemNameLabel.textContent="Name";
    const newItemNameInput = document.createElement('ion-input');
    newItemNameInput.setAttribute('type', 'text');
    newItemNameInput.setAttribute('id', 'input-param-name');
    newItemName.appendChild(newItemNameLabel);
    newItemName.appendChild(newItemNameInput);
    newCardContent.appendChild(newItemName);

    const newItemValue = document.createElement('ion-item');
    const newItemValueLabel = document.createElement('ion-label');
    newItemValueLabel.setAttribute('position', 'floating');
    newItemValueLabel.textContent="Value";
    const newItemValueInput = document.createElement('ion-input');
    newItemValueInput.setAttribute('type', 'text');
    newItemValueInput.setAttribute('id', 'input-param-value');
    newItemValue.appendChild(newItemValueLabel);
    newItemValue.appendChild(newItemValueInput);
    newCardContent.appendChild(newItemValue);

    const newItemButton = document.createElement('ion-button');
    const newItemButtonIcon = document.createElement('ion-icon');
    newItemButton.setAttribute('id', 'btn-add-param');
    newItemButtonIcon.setAttribute('slot', 'start');
    newItemButtonIcon.setAttribute('name', 'add');
    newItemButton.textContent = "Add Parameter";
    newItemButton.appendChild(newItemButtonIcon);
    newCardContent.appendChild(newItemButton);

    newCard.appendChild(newCardContent);

    newItem.appendChild(newCard);
}

newBtn.addEventListener('click', () => {
  const enteredEvent = eventInput.value;

  if (enteredEvent.trim().length <= 0  ) {
    alertCtrl
      .create({
        message: 'Please enter valid event type!',
        header: 'Invalid inputs',
        buttons: ['Ok']
      })
      .then(alertElement => {
        alertElement.present();
      });
    return;
  }

  createNewItem();
  newParamItem.appendChild(newItem);
  
  paramBtn=document.querySelector('#btn-add-param');
  paramBtn.addEventListener('click', addParamButton)
});

const addParamButton = () => {
    const paramNameInput = document.querySelector('#input-param-name');
    const paramValueInput = document.querySelector('#input-param-value');

    let enteredName = paramNameInput.value;
    let enteredValue = paramValueInput.value;
    if (enteredName.trim().length <= 0  || enteredValue.trim().length <= 0 ) {
      alertCtrl
        .create({
          message: 'Please enter valid name and value!',
          header: 'Invalid inputs',
          buttons: ['Ok']
        })
        .then(alertElement => {
          alertElement.present();
        });
      return;
    }
  
    const newParamResult = document.createElement('ion-item');
    newParamResult.textContent = enteredName + ': ' + enteredValue;
    paramList.appendChild(newParamResult);

    const param ={
        'name': enteredName,
        'value': enteredValue
    }
    paramArray.push(param);
    console.log(paramArray);
    newParamItem.removeChild(newItem);
  };

sendEventBtn.addEventListener('click', () => {
    let jsonParams = JSON.stringify(paramArray);
    console.log(jsonParams);
    const enteredEvent = eventInput.value;
    const dateValue = new Date().toISOString();
    const payload = {
        'eventName' : enteredEvent,
        'date' : dateValue,
        'parameters' : paramArray,
        'forcePush' : false
    }
    console.log(payload);

    RetenoPlugin.logEvent(payload,
        function (msg)  {},
        function (err)  {});
 }
);