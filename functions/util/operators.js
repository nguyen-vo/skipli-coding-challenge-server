//random generator
randGenerator = () => Math.floor(Math.random() * 900000 + 100000);

//Validiating phone Number
phoneValidator = (phoneNum) => (phoneNum.length === 10 && phoneNum !== "") ? true : false;

module.exports ={randGenerator, phoneValidator};