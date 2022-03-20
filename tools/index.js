const fs = require("fs");
const validation = require("../validation");
const user_data = require("../user.json");

/**
 * return a boolean is the value of checking unique value
 * @param {*} value User data
 * @param {string} opt option
 * @returns boolean
 */
const unique_func = (value, opt) => {
    if(opt == "email") {
        const unique = user_data.findIndex(e => e.email == value);
        if(unique == -1) return true;
        return false;
    }

    if(opt == "phone") {
        const unique = user_data.findIndex(e => e.phone == value);
        if(unique == -1) return true;
        return false;
    }
}

/**
 * This Function Represents Create User.
 * @param {JSON} data JSON data of User.
 * @returns message
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
            data.name = data.name.trim();
            data.role = data.role.trim();

            const new_data = {
                user_id: id,
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: data.password,
                role: data.role,
            };

            const uni_email = unique_func(data.email, "email");
            const uni_phone = unique_func(data.phone, "phone");

            if(uni_email && uni_phone) {
                user_data.push(new_data);
                upload_func(JSON.stringify(user_data));
                return "User Created";
            }
         
            const obj_message = {error: []};
            if(!uni_email) obj_message.error.push("Email Already Exist");
            if(!uni_phone) obj_message.error.push("Phone no. Already Exist");
            return obj_message;
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
 * @returns message
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
        }
    });

    if(id_available) {
        message = { status: "Not Updated" , error: []};

        if(data.name) { 
            if(name) user_data[index].name = data.name;
            else message.error.push("Invalid Name");
        }
        
        if(data.phone) {
            if(phone) {
                const uni = unique_func(data.phone, "email");
                if(uni) user_data[index].phone = data.phone;
                else message.error.push("Phone no. Already Existed");
            }
            else message.error.push("Invalid Phone no.");
        }

        if(data.email) {
            if(email) {
                const uni = unique_func(data.email, "email");
                if(uni) user_data[index].email = data.email;
                else message.error.push("Email Already Existed");
            }
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
 * @returns message
 */
const delete_func = (uid) => {
    let index, available;
    user_data.find((e,i) => {
        if(e.user_id == uid) {
            available = true;
            index = i;
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