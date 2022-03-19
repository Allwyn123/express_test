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
    const password = validation.password_valid(data.password);
    const role = validation.string_valid(data.role);

    if(data.name &&  data.phone && data.email && data.role && data.password) {
        if(name && phone && email && role && password) {
            const id = user_data[user_data.length - 1].user_id + 1;
            
            const new_data = {
                user_id: id,
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: data.password,
                role: data.role,
            };

            user_data.push(new_data);
            upload_func(JSON.stringify(user_data));
            return "User Created";
        }

        const err_obj = [ 
            {bool: name, err_mess: "Invalid Name" },
            {bool: phone, err_mess: "Invalid Phone" },
            {bool: email, err_mess: "Invalid Email" },
            {bool: password, err_mess: "Invalid Password" },
            {bool: role, err_mess: "Invalid Role" }
        ];

        const mess_obj = { status: "Not Created", error: [] };
        for(let i of err_obj) {
            if(!i.bool) mess_obj.error.push(i.err_mess);
        }

        if(mess_obj.error.length == 0) mess_obj.status = "Created";
        return mess_obj;
    }
    
    return "ERROR: Enter full details of user";
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
    const password = validation.password_valid(data.password);
    const role = validation.string_valid(data.role);
    let index, id_available, message;

    user_data.find(({ user_id }, i) => {
        if(user_id == uid) {
            id_available = true;
            index = i;
            return true;
        }
    });

    if(id_available) {
        message = { status: "Not Updated" , error: []};

        if(data.name) { 
            if(name) user_data[index].name = data.name;
            else message.error.push("Invalid Name");
        }
        
        if(data.phone) {
            if(phone) user_data[index].phone = data.phone;
            else message.error.push("Invalid Phone no.");
        }

        if(data.email) {
            if(email) user_data[index].email = data.email;
            else message.error.push("Invalid Email");
        }

        if(data.role) {
            if(role) user_data[index].role = data.role;
            else message.error.push("Invalid Role");
        }

        if(data.password) {
            if(password) user_data[index].password = data.password;
            else message.error.push("Invalid Password");
        }

        upload_func(JSON.stringify(user_data));

        if(message.error.length == 0) message.status = "Updated";
        return message;

    } else return "User Not Found";
}

/**
 * This Function Represents Delete User.
 * @param {integer} uid ID of user.
 */
const delete_func = (uid) => {
    let index, available;
    user_data.find((e,i) => {
        if(e.user_id == uid) {
            available = true;
            index = i;
            return true;
        }
    });

    if(available) {
        user_data.splice(index, 1);
        upload_func(JSON.stringify(user_data));
        return "User deleted"
    }
    return "User Not Found";
}

/**
 * Display user Function.
 * @param {integer} uid ID of user.
 * @returns JSON
 */
const display_func = (uid) => {
    return user_data.find((e) => e.user_id == uid);   
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