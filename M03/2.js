// Cara mudah
const detail = document.getElementById("detail");
function loadData() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      let output = "";
      let no = 1;
      data.forEach((element) => {
        output += `
            <tr>
                <td>${no++}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td><button onclick= 'showDetail(${element.id})'>Detail</button></td>
            </tr>
            `;
      });
      document.querySelector("tbody").innerHTML = output;
    });
}


function showDetail(id) {
  fetch("https://jsonplaceholder.typicode.com/users/" + id)
    .then((res) => res.json())
    .then((data) => {
      detail.innerHTML = "";
      detail.insertAdjacentHTML(
        "beforeend",
        `
          <center>
          <ul>
              <li>${data.name}</li>
              <li>${data.username}</li>
              <li>${data.email}</li>
              <li>${data.address.city}</li>
              <li>${data.phone}</li>
          </ul>
          </center>
          `
      );
    });
}
loadData();

// Cara async
// const tbody = document.querySelector("tbody");
// const detail = document.getElementById("detail");
// let usersData = [];

// const loadData = async () => {
//   try {
//     const url = await fetch("https://jsonplaceholder.typicode.com/users");
//     usersData = await url.json();
//     loadUserData(usersData);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const loadUserData = (data) => {
//   let no = 1;
//   const output = data
//     .map((element) => {
//       return `
//         <tr>
//             <td>${no++}</td>
//             <td>${element.name}</td>
//             <td>${element.email}</td>
//             <td><button onclick= 'showDetail(${element.id})'>Detail</button></td>
//         </tr>
//         `;
//     })
//     .join("");
//   tbody.innerHTML = output;
// };

// function showDetail(id) {
//   fetch("https://jsonplaceholder.typicode.com/users/" + id)
//     .then((res) => res.json())
//     .then((data) => {
//       detail.innerHTML = "";
//       detail.insertAdjacentHTML(
//         "beforeend",
//         `
//         <center>
//         <ul>
//             <li>${data.name}</li>
//             <li>${data.username}</li>
//             <li>${data.email}</li>
//             <li>${data.address.city}</li>
//             <li>${data.phone}</li>
//         </ul>
//         </center>
//         `
//       );
//     });
// }

// loadData();
