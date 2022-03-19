/**
 * return a boolean is the value is validated
 * @param {string} value name/string of user
 * @returns boolean
 */
 const string_valid = (value) => {
    const stringPattern = /^[a-zA-Z]+$/;
    return stringPattern.test(value);
}

/**
 * return a boolean is the value is validated
 * @param {string} value Phone no. of user
 * @returns boolean
 */
const phone_valid = (value) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(value);
}

/**
 * return a boolean is the value is validated
 * @param {string} value email of user
 * @returns boolean
 */
const email_valid = (value) => {
    const emailPattern = /.+\@.+\..+/;
    return emailPattern.test(value);
}

/**
 * return a boolean is the value is validated
 * @param {string} value password of user
 * @returns boolean
 */
const password_valid = (value) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordPattern.test(value);
}

module.exports = { string_valid, phone_valid, email_valid, password_valid}
