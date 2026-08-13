const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const app = express();


app.use(helmet());

const limiter = rateLimit({
    windowsMs: 15 * 60 * 100,
    max: 100,
    message: "Too many requests from this IP, pleasetry again after 15 minutes."
});
app.use('/api,limiter');

//DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI )
.then(() => console.log("connect to MongoDB"))
.catch((err) => console.log("DB connection error:", err));

//MIDDLEWARES
app.use(cors({
    origin: 'http://localhost:3000', //prep for react
    credentials: true
}));
app.use(express.json());
//HEALTH CHECK ROUTE
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
//API ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use("/api/contests", require('./routes/constest'));
app.use("/api/users", require('./routes/users'))
app.use("/api/users", require('./routes/follows'))
app.use("/api/post",require('./routes.comments'));
app.use("/api/notifications", require('./routes/notifications'));
//GLOBAL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    console.log("Global Error Caught: ", err.stack);
    if(err.code === 'LIMIT_FILE_SIZE'){
        return res.status(400).json({message: "File is too large! Maximum limit is 50MB."});
    }
    res.status(err.status || 500).json({
        message: err.message || "An unexpected internal server error occurred.",
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});
//STARTIGN the SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running  on port ${PORT}`);
});

