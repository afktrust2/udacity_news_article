import { isValidURL } from './URLChecker';

function handleSubmit() {
    document.getElementById('click').addEventListener("click", async(event) => {
    event.preventDefault();

    //local variables for the function
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
    const result = document.getElementById('results').innerHTML;
    let apiKey = '';
    let data = {};

    const postData = async (url = "", data = {}) => {
        const res = await fetch(url, {
            method: "POST",
            credentials: "cors",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({url:data}),
        });

        try {
          const newData = await res.json();
          console.log(newData);
          return newData;
      } catch(error) {
          console.log("error", error);
      }
    };

    const getRes = async (baseURL, key, url)=>{
      const res = await fetch(`${baseURL}key=${key}&lang=en&url=${url}`);
      console.log(res);
      try {
        const data = await res.json();
        console.log(data);
        return data;
      }  catch(error) {
        // appropriately handle the error
        console.log("error", error);
      }
    };
    //grabs api from .env file
    async function GetAPI() {
      const req = await fetch('/api');
      let data = await req.json();
      apiKey = data.key;
      console.log(apiKey)
      return apiKey;
    };
    //update the UI with data response
    const updateUI = async ()=> {
      const request = await fetch("/get");
          try {
              const allData = await request.json();
              result.innerHTML = `<ul>
            <li><span>URL:</span> ${inputURL}</li>
            <li><span>Subjectivity:</span> ${allData.subjectivity};</li>
            <li><span>Confidence:</span> ${allData.confidence}%;</li>
            <li><span>Irony:</span> ${allData.irony}.</li>
            </ul>`;
          } catch(error) {
              console.log("error", error);
          }
    };

    // check what url was put into the form field
    let inputURL = document.getElementById('name').value;

    if (isValidURL(inputURL) == true) {
      GetAPI()
      console.log(apiKey);
        getRes(baseURL, apiKey, inputURL)
        .then((data) =>{
          return postData('/post', {
            subjective: data.subjectivity,
            confident: data.confindence,
            irony: data.irony
          });
        })
        .then(function(){
          updateUI('/get');
        });
    } else {
      console.log("Not Valid URL");
      alert("Not valid url. Please enter valid url");
      return false;
    }
  });
};

export { handleSubmit };
