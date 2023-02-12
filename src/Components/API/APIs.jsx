

const API_KEY = "0d1d8fa39ae14774b80d34e9c2fe719e";
var requestOptions = { method: "GET" };

export function location(input, setData) {
  fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${API_KEY}`, requestOptions)
    .then((response) => response.json())
    .then((result) =>{
      setData(result.features != undefined ? result.features : []);
   } )
    .catch((error) => console.log("error", error));
  }

  export function showCurrentLoation(){
// fetch("https://api.geoapify.com/v1/geocode/reverse?lat=31.9472616&lon=34.8809776&format=json&apiKey=YOUR_API_KEY")
  // .then(response => response.json())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  }
  