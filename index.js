const temperatureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".searchfield");
const form=document.querySelector("form");


let target="delhi";
const fetchdata= async(target)=>{
try{
    const url=`https://api.weatherapi.com/v1/current.json?key=3c1d81e460a04d4fb36181812232603&q=${target}`;


    const response= await fetch(url);
    const data= await response.json();
    console.log(data);
    
    const {
        current:{temp_c,
            condition:{text,icon},
        },
        location:{name,localtime},
    }=data;
    
    // console.log(data.current.temp_c);
    // updateDom(data.current.temp_c,data.location.name);
    
    updateDom(temp_c,name,localtime,icon,text);
}
catch(error){
alert("location not found");
}
};

function updateDom(temprature,city,time,emoji,text){
temperatureField.innerText=temprature;
cityField.innerText=city;
const exactTime =time.split(" ")[1];
const exactdate =time.split(" ")[0];

const exactDay= new Date(exactdate).getDay();
// console.log(exactDay);
dateField.innerText=`${exactTime}- ${getDayFullName(exactDay)}-${exactdate}`;
emojiField.src=emoji;
weatherField.innerText=text;
}


fetchdata(target);

function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";
  
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 3:
        return "Wednesday";
  
      case 4:
        return "Thursday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturdat";
  
      default:
        return "Don't Know";
    }
  }

  

  const search=(e)=>{
    e.preventDefault();

    target=searchField.value;
    fetchdata(target);
  }
  
  form.addEventListener("submit",search);
  