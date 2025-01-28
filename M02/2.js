let lirikLagu = {
  status: true,
  data: {
    artist: "Westlife",
    songTitle: "I Have A Dream",
    songLyrics: "I have a dream, a song to sing\nTo help me cope with anything\nIf you see the wonder (wonder) of a fairy tale\nYou can take the future even if you fail",
  },
};

let title = document.getElementById("title");
let data = document.getElementById("data");
let count = document.getElementById("count");

let titleContent = lirikLagu.data.songTitle;
let dataContent = lirikLagu.data.songLyrics.replaceAll();
let countSentences = lirikLagu.data.songLyrics.split(" ").length - 1;

title.innerHTML = title.innerHTML + titleContent;
data.innerHTML = data.innerHTML + dataContent;
count.innerHTML = count.innerHTML + countSentences;
