const hello = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Success!"); // Yay! Everything went well!
//   }, 500);
    const link = 'https://jsonplaceholder.typicode.com/users';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link);
    xhr.onload = () => {
        if (xhr.status == 200) {
            resolve(xhr.response);
        } else {
            reject('Err: Please try again.');
        }
    }
});

hello.then((result) => console.log(result));