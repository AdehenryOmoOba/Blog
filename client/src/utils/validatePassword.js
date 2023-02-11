let isAllTrue = false
const numberSet = '0123456789'
const specialXterSet = '!@#$%^&*'

export function validatePassword(password, errorChecks) {

    for (const element of errorChecks)  element.classList.remove('passed')
    
      const checkObj = {isLowerCase: false, isUpperCase: false, isSpecialXter: false, isNumber: false, isLength: false}
    
     for (const i of password) {
         if(password.length >= 5) checkObj.isLength = true
         if(i.charCodeAt(0) >= 97 && i.charCodeAt(0) <= 122) checkObj.isLowerCase = true
         if(i.charCodeAt(0) >= 65 && i.charCodeAt(0) <= 90) checkObj.isUpperCase = true
         if(numberSet.includes(i)) checkObj.isNumber = true
         if(specialXterSet.includes(i)) checkObj.isSpecialXter = true
     }
    
     isAllTrue = checkObj.isLowerCase && checkObj.isUpperCase && checkObj.isSpecialXter && checkObj.isNumber && checkObj.isLength
     
     if(isAllTrue) return true
    
     for (const passed in checkObj) {
       if (checkObj[passed]) {
        for (const element of errorChecks)  if (element.dataset.errorCheck === passed) element.classList.add('passed')
       }
     }
  
     return false
    }
  