const userId = "userId";



const setUser = (id) => {
  localStorage.setItem(userId, id)
}

const getUser = () => {
  let data = localStorage.getItem(userId)
  return data || null;
}


export { setUser, getUser }