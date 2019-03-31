import fetch from 'node-fetch';

export const translateMessage = (message, language) => {

  // fetch('https://translate.yandex.net/api/v1.5/tr/getLangs?key=trnsl.1.1.20190331T194516Z.9cbb5014d944a3d7.753bb002fe7ed01aa8635704e777dc5db5a8ced8')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err));

  return fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190331T194516Z.9cbb5014d944a3d7.753bb002fe7ed01aa8635704e777dc5db5a8ced8&text=${message}&lang=${language}&[format=plain]`)
    .then(response => response.json())
    .then(data => data.text)
    .catch(err => console.log(err));
}


export const languagesArray = [
  {
    language: 'Spanish',
    short: 'es',
  },
  {
    language: 'English',
    short: 'en',
  },
  {
    language: 'Italian',
    short: 'it',
  },
  {
    language: 'Catalan',
    short: 'ca',
  },
  {
    language: 'Portuguese',
    short: 'pt',
  },
  {
    language: 'German',
    short: 'de',
  },
  {
    language: 'French',
    short: 'fr',
  },
]

//https://tech.yandex.com/translate/doc/dg/concepts/api-overview-docpage/ <- list languages