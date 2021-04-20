function operationRequest(){
    axios.get('http://localhost:8080/manageroperations')
    .then((response)=>{
        balanceShow(response.data)
        operationShow(response.data)
    })
}

function operationShow(data){
    //console.log(data.length)
    let operation_list = document.querySelector('#list-operations');
    for(let i=0;i<10;i++){
        operation_list.innerHTML += `<li><span>${data[i].concept}</span> || <span>${data[i].amount}</span></li>`
    }
    // data.forEach((element)=>{
    //     operation_list.innerHTML += `<li><span>${element.concept}</span> || <span>${element.amount}</span></li>`
    // })
}

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
    current_balance.innerHTML += `${balance}`
}

operationRequest()

let btnAddOperation = document.getElementById('btn-add-operation')
let overlay = document.getElementById('overlay')
let popup = document.getElementById('popup')
let btnClosePopup = document.getElementById('btn-close-popup')
let btnSubmit = document.getElementById('btn-submit')

btnAddOperation.addEventListener('click', ()=>{
    overlay.classList.add('active')
    popup.classList.add('active')
})

btnClosePopup.addEventListener('click', ()=>{
    overlay.classList.remove('active')
    popup.classList.remove('active')
})