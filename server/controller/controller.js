var Userdb = require('../model/model');

const Usersdb = require("../model/model1");


//Handling user login


exports.loginPage = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const { email, password } = req.body;

    console.log(email,'////////////////////////////////');

    // Find the user in the database
    Usersdb.findOne({ email, password })
        .then(user => {
            // console.log(user,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            if (user) {
                // session
                req.session.user = user;
                // console.log(req.session.user,"hlkjhekjdfdsssssssssssssssj==========================")
                res.redirect('/');
            } else {
                const error_msg = "Invalid name or password";
                res.redirect('/login?error_msg=' + encodeURIComponent(error_msg));
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while processing the login operation"
            });
        });
};








// create and save new user
exports.create = (req, res) => {

    let { name,
        email,
        gender,
        status } = req.body
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    // new user
    const user = new Userdb({
        name: name,
        email: email,
        gender: gender,
        status: status
    })

    

    // save user in the database
    user.save(user).then(data => {
            // res.send(data)
            res.redirect('/add-user');
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}



// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving user with id " + id })
            })

    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }


}

// Update a new idetified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }



    const id = req.params.id;

    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
