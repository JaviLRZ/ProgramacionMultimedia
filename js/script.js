let weather = {
  apiKey: "f16daec57df9b85ada5c6c548fde8306",
  fetchWeather: function (city) {
   
    let name = document.querySelector(".namegetter");
    let e = document.getElementById("opciones");
    let strUser = e.options[e.selectedIndex].value;

    if(name.value != "" && strUser != ""){
      fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" 
        +city
        +"&units=metric&appid="
        +this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            Swal.fire({
              icon: 'error',
              title: 'La ciudad no existe...',
              text: 'Debes rellenar una ciudad existente',
              confirmButtonText: 'Vale'
            })
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data,city));
    }
    else{
      if(strUser === ""){
        e.style.borderColor = "red";
      }
      if(name.value === ""){
        name.style.borderColor = "red";
      }
      Swal.fire({
        icon: 'error',
        title: 'Faltan Datos...',
        text: 'Debes rellenar todos los campos',
        confirmButtonText: 'Vale'
      })

    }
  },
  displayWeather: function (data,city) {
    let { name } = data;
    let { icon, description } = data.weather[0];
    let { temp, temp_max, temp_min } = data.main;


    document.querySelector(".city").innerText = "El Tiempo en " + city;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = "La Temperatura ahora mismo es de " + temp + "°C";
    document.querySelector(".temp_min").innerText = "La Temperatura mínima ahora mismo es de " + temp_min + "°C";
    document.querySelector(".temp_max").innerText ="La Temperatura máxima ahora mismo es de " + temp_max + "°C";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};


  function search() {
    let value = document.querySelector(".search_button");

    if(value != null){
      value.addEventListener("click",weather.search());
    }
    let value2 = document.querySelector(".search-bar");
  
    if(value2 != null){
      value2.addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
          weather.search();
        }
      });
    }
  }
  function changeStyle(id) {
    if(id === 'name'){
      document.querySelector(".namegetter").style.borderColor = "#fff";
    }
    if(id === 'opciones'){
      document.getElementById("opciones").style.borderColor = "#fff";
    }
  }