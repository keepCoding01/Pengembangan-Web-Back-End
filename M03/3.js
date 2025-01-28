// Pakai Fetch API
// function loadData() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.json())
//     .then((data) => {
//       let output = "";
//       data.forEach((element) => {
//         output += `
//               <tr>
//                   <td>
//                       <a href="https://${element.website}" title="Visit ${element.website}" target="_blank"
//                           onmouseover="showCompanyName(${element.id}, '${element.company.name}')"
//                           onmouseout="hideCompanyName(${element.id})">
//                           ${element.id}
//                       </a>
//                       <span id="${element.id}" style="display: none; margin-left: 10px;"></span>
//                   </td>
//                   <td>${element.name}</td>
//                   <td>${element.username}</td>
//                   <td>${element.email}</td>
//                   <td>${element.address.city}</td>
//               </tr>
//               `;
//       });
//       document.querySelector("tbody").innerHTML = output;
//     });
// }

// function showCompanyName(id, companyName) {
//   const companySpan = document.getElementById(`${id}`);
//   companySpan.textContent = `${companyName}`;
//   companySpan.style.display = "inline";
// }

// function hideCompanyName(id) {
//   const companySpan = document.getElementById(`${id}`);
//   companySpan.style.display = "none";
// }

// loadData();

// Pakai AJAX
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
                        <td>
                            <a href="https://${element.website}" title="Visit ${element.website}" target="_blank" 
                                onmouseover="showCompany(${element.id}, '${element.company.name}')" 
                                onmouseout="hideCompany(${element.id})">
                                ${element.id}
                            </a>
                            <span id="${element.id}" style="display: none; margin-left: 10px;"></span>
                        </td>
                        <td>${element.name}</td>
                        <td>${element.username}</td>
                        <td>${element.email}</td>
                        <td>${element.address.city}</td>
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

function showCompany(id, companyName) {
  const companySpan = document.getElementById(`${id}`);
  companySpan.textContent = `${companyName}`;
  companySpan.style.display = "inline";
}

function hideCompany(id) {
  const companySpan = document.getElementById(`${id}`);
  companySpan.style.display = "none";
}

loadData();
