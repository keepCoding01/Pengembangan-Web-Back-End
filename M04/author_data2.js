class AuthorData {
  constructor() {
    this.page = 1;
    this.getDataList(this.page);
  }

  getDataList(page) {
    this.data = `https://picsum.photos/v2/list?page=${page}&limit=1`; // Ubah limit menjadi 1 untuk hanya menampilkan satu gambar
  }

  async getProfile() {
    let response = await fetch(this.data);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  showProfile(obj) {
    let image = document.getElementById("current-image");
    let authorName = document.getElementById("author-name");
    obj.forEach((result) => {
      image.src = result.download_url;
      authorName.textContent = result.author;
    });
  }
}
export default AuthorData;
