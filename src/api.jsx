import axios from "axios";


  const request = axios.create({
    baseURL:'https://youtube.googleapis.com/youtube/v3',
    params:{
        key:'AIzaSyA6j9eV5UxzagnCFkU9zOB3EXX5mImNA-k'
    }
})

export default request