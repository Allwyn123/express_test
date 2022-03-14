const fs = require("fs");
const validation = require("../validation");
const user_data = require("../user.json");

/**
 * This Function Represents Create User.
 * @param {JSON} data JSON data of User.
 */
 const create_func = (data) => {
    const name = validation.string_valid(data.name);
    const phone = validation.phone_valid(data.phone);
    const email = validation.email_valid(data.email);
    const role = validation.string_valid(data.role);

    if(name && phone && email && role) {
        if(data.name != undefined &&  data.phone != undefined && data.email != undefined && data.role != undefined) {
            const id = user_data[user_data.length - 1].user_id + 1;
            
            const new_data = {
                user_id: id,
                name: data.name,
                phone: data.phone,
                email: data.email,
                role: data.role
            };

            user_data.push(new_data);
            const json_data = JSON.stringify(user_data);
            upload_func(json_data);
            return;
        }

        console.log("ERROR: Enter full details of user");
        return;
    }

    console.log("Invalid Values");
}

/**
 * This Function Represents Update User.
 * @param {JSON} data JSON data of User.
 * @param {integer} uid ID of User.
 */
const update_func = (data, uid) => {
    const name = validation.string_valid(data.name);
    const phone = validation.phone_valid(data.phone);
    const email = validation.email_valid(data.email);
    const role = validation.string_valid(data.role);
    let index, id_available, message;

    user_data.forEach((e,i) => {
        if(e.user_id == uid) {
            id_available = true;
            index = i;
        }
    });

    if(id_available) {
        message = "Updated";

        if(name && data.name != undefined) {
            user_data[index].name = data.name;
        } else if(!name) {
            message = "Invalid Name";
        }
        
        if(phone && data.phone != undefined) {
            user_data[index].phone = data.phone;
        } else if(!phone) {
            message = "Invalid Phone no.";
        }

        if(email && data.email != undefined) {
            user_data[index].email = data.email;
        } else if(!email) {
            message = "Invalid Email";
        }

        if(role && data.role != undefined) {
            user_data[index].role = data.role;
        } else if(!role) {
            message = "Invalid Role";
        }

        const json_data = JSON.stringify(user_data);
        upload_func(json_data);
        return message;
    } else {
        return "ID Not Match";
    }
}

/**
 * This Function Represents Delete User.
 * @param {integer} uid ID of user.
 */
const delete_func = (uid) => {
    let index, available;
    user_data.forEach((e,i) => {
        if(e.user_id == uid) {
            available = true;
            index = i;
        }
    });

    if(available) {
        user_data.splice(index, 1);
        const json_data = JSON.stringify(user_data);
        upload_func(json_data);
        return "User deleted"
    }
    return "User ID Not Found";
}

/**
 * Display user Function.
 * @param {integer} uid ID of user.
 * @returns JSON
 */
const display_func = (uid) => {
    let index, available;
    user_data.forEach((e,i) => {
        if(e.user_id == uid) {
            index = i;
            available = true;
        }
    });

    if(available) return user_data[index];
}

    /**
 * Upload file usign user data.
 * @param {JSON} data JSON data of user.
 */
const upload_func = (data) => {
    fs.writeFile("user.json", data, (err) => {
        if(err) throw err;
    });
}

module.exports = { create_func, update_func, delete_func, display_func, upload_func }