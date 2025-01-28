let tanggalHariIni = new Date(Date.now()),
  now = document.getElementById("now");
now.innerHTML = "Now : " + tanggalHariIni.toLocaleDateString();

let notif = document.getElementById("notif");
notif.onclick = function () {
  let userEmail = document.getElementById("userEmail").value;
  alert("Kami akan memberikan notifikasi ke " + userEmail + ". Terima kasih");
};
