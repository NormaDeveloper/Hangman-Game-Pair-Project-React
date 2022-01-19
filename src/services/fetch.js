const getWordFromApi =()=>{
    return fetch ('https://palabras-aleatorias-public-api.herokuapp.com/random')
    .then(response => response.json())

}
const objectWord ={
    getWordFromApi: getWordFromApi
}

export default objectWord;