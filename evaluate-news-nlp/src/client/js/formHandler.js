import { isValidURL } from './js/URLChecker.js'

function handleSubmit(event) {
    event.preventDefault();

    //local variables for the function
    const baseURl = 'https://api.meaningcloud.com/sentiment-2.1';
    const result = document.getElementById('results').innerHTML;
    let apiKey = '';
    let data = {};

    const postData = async (url = "", data = {}) => {
        const res = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data),
        });

        try {
          const newData = await res.json();
          return newData;
      } catch(error) {
          console.log("error", error);
      };
    };

    const getRes = async (baseURL, apiKey, url)=>{
      const res = await fetch(`${baseURL}key=${zipCode}&lang=en&url=${url}`);
      try {
        const data = await res.json();
        console.log(data)
        return data
      }  catch(error) {
        // appropriately handle the error
        console.log("error", error);
      };
    };
    //grabs api from .env file
    async function GetAPI() {
      const req = await fetch('/api');
      data = await req.json();
      apiKey = data.key;
      return apiKey;
    };
    //update the UI with data response
    const updateUI = async ()=> {
      const request = await fetch("/get")
          try {
              const allData = await request.json();
              result.innerHTML = `
            <li class="results__item"><span class="api__title">URL:</span> ${inputURL}</li>
            <li class="results__item"><span class="api__title">Subjectivity:</span> ${allData.subjectivity};</li>
            <li class="results__item"><span class="api__title">Confidence:</span> ${allData.confidence}%;</li>
            <li class="results__item"><span class="api__title">Irony:</span> ${allData.irony}.</li>`;
          } catch(error) {
              console.log("error", error)
          };
    };

    // check what url was put into the form field
    let inputURL = document.getElementById('name').value

    GetAPI()
    if (Client.isValidURL(inputURL) == true) {
        getRes(baseURL, apiKey, inputURL)
        .then((data) =>{
          return postData('/post', {
            subjective: data.subjectivity,
            confident: data.confindence,
            irony: data.irony
          });
        })
        .then(function(){
          updateUI('/get')
        })
    } else {
      console.log("Not Valid URL");
      alert("Not valid url. Please enter valid url");
      return false
    }
}


export { handleSubmit }
