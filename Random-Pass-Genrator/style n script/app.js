let pass = document.querySelector('#pass');
let copy = document.querySelector('.passwords i')
let genratebtn = document.querySelector('#generate');


const nums = "0123456789";
const charC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charS = "abcdefghijklmnopqrstuvwxyz";
const symbol = "!@#$%^&*"

const maxlength = 12;

const total = nums + charC + charS + symbol;


const randomgen = () =>{
  let password = "";
  password += charC[Math.floor(Math.random()*charC.length)];
  password += charS[Math.floor(Math.random()*charS.length)];
  password += nums[Math.floor(Math.random()*nums.length)];
  password += symbol[Math.floor(Math.random()*symbol.length)];
  
  while(maxlength > password.length){
    password += total[Math.floor(Math.random()*total.length)];
  }
  pass.innerText = `${password}`
}


genratebtn.addEventListener('click', ()=>{
  randomgen(); 
})

const copyfnc = () =>{
  navigator.clipboard.writeText(pass.innerText) 
  copy.classList = 'bx bx-check'
  setTimeout(() => {
    copy.classList = 'bx bx-copy'
  }, 1000);
}

copy.addEventListener('click', ()=>{
  copyfnc();
})