import axios from "axios";


// const baseURL = "http://localhost:8080";

const baseURL = "https://my-blog-app-nld1.onrender.com";



const getApi = async (url) => {
  let { data } = await axios.get(baseURL + url);
  return data;
}


const deleteApi = async (url) => {
  let { data } = await axios.delete(baseURL + url);
  return data;
}


const postApi = async (url, obj) => {
  let { data } = await axios.post(baseURL + url, obj);
  return data;
}


const putApi = async (url, obj) => {
  let { data } = await axios.put(baseURL + url, obj);
  console.log('DELETE : ', data);
  return data;
}




export { getApi, deleteApi, postApi, putApi }