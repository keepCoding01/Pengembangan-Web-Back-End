import AuthorData from "./author_data2.js";

let authordata = new AuthorData();
let currentPage = 1;

let show = function () {
  console.log(authordata);
  authordata
    .getProfile()
    .then((data) => {
      authordata.showProfile(data);
    })
    .catch((e) => console.log(e));
};

document.getElementById("next-btn").addEventListener("click", () => {
  currentPage++;
  authordata.getDataList(currentPage);
  show();
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    authordata.getDataList(currentPage);
    show();
  }
});

show();
