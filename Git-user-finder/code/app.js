let baseUrl = "https://api.github.com/users/"


const input = document.querySelector('#Search');
const searchbtn = document.querySelector('#submit');

const usersec = document.querySelector('.user');


let avatar = document.querySelector('#profile');
let userName = document.querySelector('#username');
let followers = document.querySelector('#followers');
let following = document.querySelector('#following');
let repo = document.querySelector('#repo');
let visit = document.querySelector('#visit')





document.addEventListener('keypress', (e)=>{
  if(e.key === "Enter"){
    e.preventDefault();
    searchbtn.click();
  }
})


let div = document.createElement('div');
let span = document.createElement('span');

const loader = () =>{
  div.className = 'loader';

  const main = document.querySelector('main');

  main.appendChild(div);
  div.appendChild(span);
  document.body.setAttribute('style', 'overflow: hidden');
}

const rmloader = () =>{
  div.remove();
  span.remove();
  document.body.setAttribute('style', 'overflow: auto');
}







const errormsg = (e) =>{
  usersec.setAttribute('style', 'display: none')

  let div = document.createElement('div');
  let img = document.createElement('img');
  let span1 = document.createElement('span');
  let span2 = document.createElement('span');
  let audio = document.createElement('audio');

  //class and text providing
  div.className = 'error';
  img.src = 'media/error.png'
  span1.className = 'response';
  span1.textContent = e.status
  span2.textContent = 'User Not Found';

  audio.src = 'media/Chipi chipi chapa chapa cat.mp3';
  audio.autoplay = true;

  div.appendChild(img)
  div.appendChild(span1)
  div.appendChild(span2)
  div.appendChild(audio)

  const resultsSection = document.querySelector('.results');

  resultsSection.appendChild(div);

  setTimeout(() => {
    div.remove()
    usersec.setAttribute('style', 'display: flex')
    window.location.reload();
    loader();
  }, 6000);
}


const user = (a) =>{
  avatar.src = a.avatar_url;
  if(a.name === null){
    userName.textContent = 'NULL'
  }else{
    userName.textContent = a.name;
  }
  followers.textContent = `${a.followers} Followers`;
  following.textContent = `${a.following} Following`;
  repo.textContent = `${a.public_repos} Public Repository`
  visit.href = a.html_url; 
}

const defaultuser =() =>{
  rmloader();

  fetch(`${baseUrl}theakash04`)
  .then((response)=>{
    return response.json()
  })
  .then((data)=>{
    avatar.src = data.avatar_url;
    userName.textContent = data.name;
    followers.textContent = `${data.followers} Followers`;
    following.textContent = `${data.following} Following`;
    repo.textContent = `${data.public_repos} Public Repository`
    visit.href = data.html_url; 
  })
}

defaultuser();


searchbtn.addEventListener('click', (e) =>{
  e.preventDefault();
  let userN = input.value;
  let url;
  if(userN === ""){
    defaultuser();
  }else{
    url = baseUrl + userN
    fetching(url);
  }
})

async function fetching(a) {
  try{
    loader();
    let response = await fetch(a);

    if(!response.ok){
      if(response.status === 404){
        errormsg(response);
      }else{
        errormsg(response)
      }
    }

    let data = await response.json();
    user(data);
  }catch(error){
    console.error("server not responding")
  }finally{
    rmloader();
  }
  
}



  

