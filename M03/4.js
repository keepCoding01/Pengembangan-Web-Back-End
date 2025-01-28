function loadData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
   
    xhr.onload = function () {
      try {
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          let output = "";
          data.forEach((element) => {
            output += `
                      <tr>
                          <td>${element.id}</td>
                          <td>${element.name}</td>
                          <td>${element.username}</td>
                          <td>${element.address.city}</td>
                          <td><a href="mailto: ">${element.email}</a></td>
                          <td><a href="tel: ">${element.phone}</a></td>
                          <td><a href="https://${element.website}"</a>${element.website}</td>
                          <td><a href="https://www.google.com/maps?q=${element.address.street}">${element.address.street}</a></td>
                          <td><a href="https://${element.company.name}">${element.company.name}</a></td>
                          <td><a href="https://www.google.com/maps?q=${element.address.geo.lat},${element.address.geo.lng}">https://www.google.com/maps?q=${element.address.geo.lat},${element.address.geo.lng}</a></td>

                      </tr>
                      `;
          });
          document.querySelector("tbody").innerHTML = output;
        }
      } catch (error) {
        console.error(error);
      }
    };
   
    xhr.onerror = function () {
      console.log("Request error...");
    };
   
    xhr.send();
  }
   
  
   
  loadData();

