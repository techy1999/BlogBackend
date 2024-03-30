// Generate response formate here...

function generateResponseFormat(code, successMessage, errorMessage, errorDescription,data) {
 return {
    error:{
      message:errorMessage,
      description:errorDescription,
    },
    message:successMessage,
    data:data,
    httpStatus:code,
 };
}

module.exports = generateResponseFormat;