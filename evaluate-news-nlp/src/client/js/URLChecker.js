function isValidURL(inputURL) {
    console.log("::: Running isValidURL :::", inputURL);
    //Found a way to check for valid URLs by a user on stackoverflow
    const regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    if(regex.test(inputURL)) {
        console.log("valid");
        return true;
    }
    else{
      return false;
    }
}

export { isValidURL }
