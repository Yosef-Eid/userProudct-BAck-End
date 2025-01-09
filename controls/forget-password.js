import User from "../models/user.js";

// Forget password
export const forgetPassword = (req, res) => {
    res.render('password')
}

// Send reset password link
export const sendResetPasswordLink = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const secret = process.env.JWt_SECRET_KEY + user.password
    const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: '10m' })
    const link = `http://localhost:5000/reset-password/${user._id}/${token}`

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    const mailOption = {
        from: process.env.EMAIL,
        to: user.email,
        subject: `Reset Password`,
        html: `<div>
                <h1>Click on the link below to reset password</h1>
                <p>${link}</p>
            </div>`
    }

    try {
        const success = await transport.sendMail(mailOption);
        console.log('Email sent: ' + success.response);
        res.render('link', { email: user.email });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send(error.response);
    }
}

// Get reset password/
export const getResetPassword = async (req, res) =>{

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const secret = process.env.JWt_SECRET_KEY + user.password
    try {
        jwt.verify(req.params.token, secret)
        res.render('reset-password', { email: user.email })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Reset password//
export const resetPassword = async (req, res) =>{

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const secret = process.env.JWt_SECRET_KEY + user.password
    try {
        jwt.verify(req.params.token, secret)
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
        user.password = req.body.password
        await user.save()
        res.render('success-password')
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}