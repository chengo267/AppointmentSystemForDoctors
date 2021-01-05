export function isValidMail(email)
{
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      return (true);
   
   
   return (false);
};

export function isValidPassword(password)
{
   return password.length >= 6;
};

export function isId(id)
{
    if (id.length !== 9 || isNaN(id)) {  
        return false;
    }
    let sum = 0, incNum;
    for (const i in id) {
        incNum = Number(id[i]) * ((i % 2) + 1); 
        sum += (incNum > 9) ? incNum - 9 : incNum;  
    }
    return (sum % 10 === 0);
}

export function isFullName(name){
   if(/^([a-zA-Z'-.]+ [a-zA-Z'-.]+)$/.test(name))
      return true;
   
   return false;

}