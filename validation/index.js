/**
 * return a boolean is the value is validated
 * @param {string} value name/string of user
 * @returns boolean
 */
 const string_valid = (value) => {
    const stringPattern = /^[a-zA-Z]+$/;

    if(stringPattern.test(value) == false) return false;
    return true;
}

/**
 * return a boolean is the value is validated
 * @param {string} value Phone no. of user
 * @returns boolean
 */
const phone_valid = (value) => {
    const phonePattern = /^[0-9]{10}$/;

    if(phonePattern.test(value) == false) return false;
    return true;
}

/**
 * return a boolean is the value is validated
 * @param {string} value email of user
 * @returns boolean
 */
const email_valid = (value) => {
    const emailPattern = /.+\@.+\..+/;

    if(emailPattern.test(value) == false) return false;
    return true;
}

module.exports = { string_valid, phone_valid, email_valid }
