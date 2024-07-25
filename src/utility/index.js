function saveToLocalStorage(data,name){
    const isSaved =localStorage.setItem(name,JSON.stringify(data))
    if (!isSaved) {
        return false
    }
    return true
}  
function getDataFromLocalStorage(name){
    if (!name) {
        return null
    }
    const data = JSON.parse(localStorage.getItem(name))
    return data
}
function generateCurrentDate() {
    const currentDate = new Date()
    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = currentDate.getFullYear()
    return `${day}/${month}/${year}`;
  }
  function generateId(length) {
    let code = "";
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const integers = "0123456789";
    if (length < 5) {
      length = 6;
    }
    for (let index = 0; index < length; index++) {
      code +=
        characters.charAt(Math.floor(Math.random() * characters.length)) +
        integers.charAt(Math.floor(Math.random() * integers.length));
    }
    return code;
  };
 
export {saveToLocalStorage,getDataFromLocalStorage,generateCurrentDate,generateId}