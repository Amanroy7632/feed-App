function isValidPhonenumber(number){
    if (number.length!=10 || number===null || parseInt(number[0]<6)) {
        return false
    }
    return true
}
function checkPasswordLength(password){
    if (!password || password.length<4) {
        return false
    }
    return true
}  
 


export {isValidPhonenumber,checkPasswordLength}