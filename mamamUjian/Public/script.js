const cust = document.querySelector(".cust");

cust.addEventListener("click", () => {
  const diklik = document.getElementById("paraf");
  diklik.innerHTML = "Our trusted customer for our services🩷🩷";

  // Tambahkan input dan tombol ke dalam elemen "paraf"
  diklik.innerHTML += `<input type="text" id="namecust" placeholder="Enter your name"/>`;
  diklik.innerHTML += `<button id="buttoncust">SEND</button>`;

  // Ambil tombol yang baru saja ditambahkan
  const buttoncust = document.getElementById("buttoncust");
  buttoncust.onclick = function () {
    const valuename = document.getElementById("namecust").value;
    const newparaf = document.createElement("p");
    newparaf.innerHTML = `Thank you, ${valuename}!`;
    diklik.appendChild(newparaf);
  };
});

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

// // pakai fetch
// function loadData() {
//   fetch("./MOCK_DATA.json")
//     .then((response) => response.json()) // Perbaiki penulisan ini
//     .then((data) => {
//       let output = "";
//       data.map((t) => {
//         output += `<tr>
//             <td>${t.id}</td>
//             <td>${t.aiport_name}</td>
//             <td>${currency.format(t.price)}</td>
//             <td><a href="${t.image}">${t.image}</a></td>s
//             <td>${t.languange}</td>
//           </tr>`;
//       });
//       document.querySelector("tbody").innerHTML = output;
//     });
// }

// loadData();

// pakai async await
// tbody = document.querySelector("tbody");
// let userData = [];

// const loadData = async () => {
//   try {
//     const url = await fetch("./MOCK_DATA.json");
//     userData = await url.json();
//     loadUserData(userData);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const loadUserData = (data) => {
//   const output = data
//     .map((t) => {
//       return `<tr>
//             <td>${t.id}</td>
//             <td>${t.aiport_name}</td>
//             <td>${currency.format(t.price)}</td>
//             <td><a href="${t.image}">${t.image}</a></td>
//             <td>${t.languange}</td>
//           </tr>`;
//     })
//     .join("");
//   tbody.innerHTML = output;
// };

// loadData();

// pakai ajax
// function loadData() {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", "./MOCK_DATA.json", true);
//   xhr.onload = function () {
//     try {
//       if (xhr.status === 200) {
//         let data = JSON.parse(xhr.responseText);
//         let output = "";
//         data.map((t) => {
//           output += `<tr>
//             <td>${t.id}</td>
//             <td>${t.aiport_name}</td>
//             <td>${currency.format(t.price)}</td>
//             <td><a href="${t.image}">${t.image}</a></td>
//             <td>${t.languange}</td>
//           </tr>`;
//         });
//         document.querySelector("tbody").innerHTML = output;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   xhr.onerror = function () {
//     console.log("request errorr......");
//   };
//   xhr.send();
// }

// loadData();

// pakai promise
// const loadData = () => {
//   return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "./MOCK_DATA.json", true);
//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         try {
//           let data = JSON.parse(xhr.responseText);
//           resolve(data); // Memanggil resolve hanya dengan data yang diambil
//         } catch (err) {
//           reject(err); // Mengirim error ke reject
//         }
//       } else {
//         reject(new Error(`Failed to load: ${xhr.status}`)); // Mengirim error jika status bukan 200
//       }
//     };
//     xhr.onerror = function () {
//       reject(new Error("Request error...")); // Mengirim error jika terjadi masalah pada request
//     };
//     xhr.send();
//   });
// };

// // Menggunakan promise
// loadData()
//   .then((data) => {
//     let output = "";
//     data.forEach((t) => {
//       output += `<tr>
//           <td>${t.id}</td>
//           <td>${t.aiport_name}</td>
//           <td>${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(t.price)}</td>
//           <td><a href="${t.image}">${t.image}</a></td>
//           <td>${t.languange}</td>
//         </tr>`;
//     });
//     document.querySelector("tbody").innerHTML = output;
//   })
//   .catch((error) => {
//     console.log(error);
//   });
