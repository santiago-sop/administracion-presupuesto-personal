//Function to get the opertaion from de data base
function operationRequest(){
    axios.get('http://localhost:8080/manageroperations')
    .then((response)=>{
        balanceShow(response.data)
        operationShow(response.data)
    })
}

//Function to show the last ten operation
function operationShow(data){
    //console.log(data.length)
    let operation_list = document.querySelector('#list-operations');
    operation_list.innerHTML = ''
    for(let i=0;i<10;i++){
        let type;
        let date = new Date(data[i].date)

        if(data[i].kind === 1) type = '<i class="kind fas fa-sign-in-alt"></i>'
        else type = '<i class="kind fas fa-sign-out-alt" style="transform: rotate(180deg);"></i>'

        const MESES = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ];
        
        let day = date.getDate()
        let month = MESES[date.getMonth()]    //date.getMonth() + 1
        let year = date.getFullYear()

        
        operation_list.innerHTML += `<li id="id${data[i].id_balance}">
                                        ${type}
                                        <span class="concept">${data[i].concept}</span>
                                        <span class="date">${day}-${month}-${year}</span>
                                        <i class="option fas fa-ellipsis-v" onclick="showOptions(${data[i].id_balance})"></i>
                                        <span class="amount">$${data[i].amount}</span>
                                    </li>`
    }
}

//Function to show de current balance.
function balanceShow(data){
    let current_balance = document.querySelector('#current-balance')
    let balance = 0;
    data.forEach((element)=>{
        if(element.kind == 1){
            balance += element.amount
        }else{
            balance -= element.amount
        }
    })
    current_balance.innerHTML = `$${balance.toFixed(2)}`
}

//Call to the functions for show the current balance and the last ten operation
operationRequest()

//let currentId = 0
let currentData ={
    id_balance: 0,
    concept: 'concept',
    amount: 0,
    date: '01/01/2000',
    kind: 0
}

//get the elements from the HTML
let btnAddOperation = document.getElementById('btn-add-operation')
let overlay = document.getElementById('overlay')
let popup = document.getElementById('popup')
let btnClosePopup = document.getElementById('btn-close-popup')
let btnSubmit = document.getElementById('btn-submit')
let btnOptionModify = document.getElementById('btn-option-modify')
let btnDelete = document.getElementById('btn-delete')
let overlayOptions = document.getElementById('overlay-options')
let popupOptions = document.getElementById('popup-options')
let textPopup = document.getElementById('text-popup')
let overlayModify = document.getElementById('overlay-modify')
let popupModify = document.getElementById('popup-modify')
let btnClosePopupModify = document.getElementById('btn-close-popup-modify')
let btnModify = document.getElementById('btn-modify')
let btnClosePopupOptions = document.getElementById('btn-close-popup-options')

//Add the events listener to the buttons
//Button to go to the form to add an operation
btnAddOperation.addEventListener('click', ()=>{
    overlay.classList.add('active')
    popup.classList.add('active')
})

//Button to close the form for add an opertation
btnClosePopup.addEventListener('click', ()=>{
    overlay.classList.remove('active')
    popup.classList.remove('active')
})

//Button to acept the incertion of a new operation
btnSubmit.addEventListener('click', ()=>{
    let concept = document.querySelector('#concept').value
    let amount = document.querySelector('#amount').value
    let date = document.querySelector('#date').value
    let kind = document.querySelector('#kind').value
    
    axios.post('http://localhost:8080/manageroperations/operations', {
        concept: concept,
        amount: amount,
        date: date,
        kind: kind,
    }).then(()=>{
        overlay.classList.remove('active')
        popup.classList.remove('active')
        alert('Datos enviados')
        operationRequest()
    })
})

//Button to close the form of posibles option in an operation
btnClosePopupOptions.addEventListener('click', ()=>{
    overlayOptions.classList.remove('active')
    popupOptions.classList.remove('active')
})

//Button to close the form for modify an operation
btnClosePopupModify.addEventListener('click', ()=>{
    overlayModify.classList.remove('active')
    popupModify.classList.remove('active')
})

//Button to show the form for modify an operation
btnOptionModify.addEventListener('click', ()=>{
    overlayOptions.classList.remove('active')
    popupOptions.classList.remove('active')

    overlayModify.classList.add('active')
    popupModify.classList.add('active')

    axios.get('http://localhost:8080/manageroperations/operations/' + currentData.id_balance)
    .then((response)=>{

        let date = new Date(response.data[0].date)
        let dateString = date.getFullYear()
        let month = date.getMonth() + 1
        if(month < 10) dateString += '-0' + month
        else dateString += '-' + month

        if(date.getDate() < 10) dateString += '-0' + date.getDate()
        else dateString += '-' + date.getDate()

        let conceptPrevious = document.getElementById('concept-modify')
        let amountPrevious = document.getElementById('amount-modify')
        let datePrevious = document.getElementById('date-modify')
        let kindPrevious = document.getElementById('kind-modify')

        conceptPrevious.value = response.data[0].concept
        amountPrevious.value = response.data[0].amount
        datePrevious.value = dateString
        kindPrevious.value = response.data[0].kind

    })
})

//Button to delete an operation
btnDelete.addEventListener('click', ()=>{
    overlayOptions.classList.remove('active')
    popupOptions.classList.remove('active')
    
    axios.delete('http://localhost:8080/manageroperations/operations/' + currentData.id_balance)
    .then(()=>{
        operationRequest()
    })
})

//Function who is call from each operation. This function give the posibility of modify or delete an operation
function showOptions(id){
    currentData.id_balance = id

    overlayOptions.classList.add('active')
    popupOptions.classList.add('active')
}

//Button to acept the modification an operation
btnModify.addEventListener('click', ()=>{
    let concept = document.querySelector('#concept-modify').value
    let amount = document.querySelector('#amount-modify').value
    let date = document.querySelector('#date-modify').value
    let kind = document.querySelector('#kind-modify').value

    axios.put('http://localhost:8080/manageroperations/operations/' + currentData.id_balance, {
        concept: concept,
        amount: amount,
        date: date,
        kind: kind,
    }).then(()=>{
        overlayModify.classList.remove('active')
        popupModify.classList.remove('active')
    }).then(()=>{
        alert('Datos enviados')
        operationRequest()
    })
})