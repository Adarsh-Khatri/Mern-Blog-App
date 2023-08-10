const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");


// ----------------------------------------------------------------------------- REGISTERING USER


exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('REGISTER BODY: ', req.body);

    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Credentials",
      });
    }
    
    //exisiting user
    const exisitingUser = await userModel.findOne({ email });

    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "Email Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error In Registering User",
      success: false,
      error,
    });
  }
};



// ------------------------------------------------------------------------------------- GET ALL USERS


exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All Users Data",
      users,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error In Get All Users",
      error,
    });
  }
};



// ---------------------------------------------------------------------------------------------- LOGIN USER


exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please Provide All Credentials",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email Is Not Registered",
      });
    }


    // ------------------------------------------------------------------------------ VALIDATING PASSWORD


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error In Login User",
      error,
    });
  }
};


// get user by id
exports.getUserById = async (req, res) => {
  try {
    let { userId } = req.params;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "No User Found By Id",
      });
    }
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "No User Found By Id After finding",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Found",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
}