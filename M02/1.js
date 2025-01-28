let content = {
  status: true,
  title: "Memory",
  data: "Memori adalah urutan byte yang berisi sepotong kecil informasi. Informasi satu chip silikon dalam computar.",
};

let title = document.getElementById("title");
let data = document.getElementById("data");
let count = document.getElementById("count");

let titleContent = content.title;
let dataContent = content.data.replaceAll("computar", "komputer");
let countSentences = content.data.split(".").length-1;

title.innerHTML = title.innerHTML + titleContent;
data.innerHTML = data.innerHTML + dataContent;
count.innerHTML = count.innerHTML + countSentences;
