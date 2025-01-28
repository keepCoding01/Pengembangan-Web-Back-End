// kode program dari kampus
let show = function (data) {
  let arr = JSON.parse(data);
  arr = arr[0];
  document.getElementById("gambar").src = arr.download_url;
  document.getElementById("author").innerHTML = arr.author;
};

let load = function () {
  let link = "https://picsum.photos/v2/list?page=2&limit=1";
  let xhr;
  xhr = new XMLHttpRequest();
  try {
    xhr = new XMLHttpRequest();
    if (!xhr) return -1;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        show(xhr.responseText);
      }
    };
    xhr.open("GET", link);
    xhr.send();
  } catch (e) {
    console.log(e);
  }
};
load();



// pakai API Fetch
// let show = function (data) {
//   let arr = data[0];
//   document.getElementById("gambar").src = arr.download_url;
//   document.getElementById("author").innerHTML = arr.author;
// };

// let load = function () {
//   let link = "https://picsum.photos/v2/list?page=2&limit=1";
//   fetch(link)
//     .then((response) => response.json())
//     .then((data) => show(data))
//     .catch((error) => console.error("Error:", error));
// };

// load();

// Pakai cara AJAX
// let show = function (data) {
//   let arr = JSON.parse(data); // Parsing data dari JSON
//   arr = arr[0]; // Mengambil item pertama dari array
//   document.getElementById("gambar").src = arr.download_url; // Menampilkan gambar
//   document.getElementById("author").innerHTML = arr.author; // Menampilkan penulis
// };

// let load = function () {
//   let link = "https://picsum.photos/v2/list?page=2&limit=1";
//   let xhr = new XMLHttpRequest(); // Hanya inisialisasi sekali

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         show(xhr.responseText); // Menampilkan data jika sukses
//       } else {
//         console.log(`Error: ${xhr.status} - ${xhr.statusText}`); // Menampilkan pesan kesalahan
//       }
//     }
//   };

//   xhr.open("GET", link, true); // Menggunakan `true` untuk async
//   xhr.send(); // Mengirim request
// };

// load(); // Memanggil fungsi untuk memuat data
