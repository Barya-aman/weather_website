// const { response } = require("express");

// console.log('client side javascript file is loaded!');




const weatherForm=document.querySelector('form');
const search= document.querySelector('input');
const messageOne=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')

messageOne.textContent='Loading..'
messagetwo.textContent=''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location =search.value;
    
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messagetwo.textContent=(data.error)
        }
        else{
            messageOne.textContent=data.location
            messagetwo.textContent=data.forecast
        }

        
    })
})
})