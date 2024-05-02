import bcrypt from 'bcrypt';
import users from '../models/users.js';
import generateJwtToken from '../utils/jwtToken.js';
import sendMail from '../services/nodemailer.js';

// Create a function to sign up a user
export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new users({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // email configration
        const emailOptions = {
            from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Your SSISM journey starts now,${name}!`,
            text: `Hi ${name}
            We're thrilled to have you join our SSISM community! Get ready to connect with experts, share knowledge, and boost your SSISM skills.            
            Let the learning begin!
            The SSISM Team`,
            // html: '<p>Hello world in ssism</p>',
        };
        // Call the sendMail function with the email options
        await sendMail(emailOptions);

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: {
                id: savedUser._id,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a function to log in a user
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await users.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // email configration
        const emailOptions = {
            from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Welcome back to SSISM, ${user.name}! 🎉`,
            text: `Welcome back, ${user.name} The SSISM community has been buzzing, and we're thrilled to have you back.  Get the latest insights, connect with experts, and keep growing your knowledge! `,
            // html: '<p>Hello world in ssism</p>', 
        };

        // Call the sendMail function with the email options
        await sendMail(emailOptions);

        // Generate a token for the user
        const token = generateJwtToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a function to get all the users
export const getUsers = async (req, res) => {
    try {
        const user = await users.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}