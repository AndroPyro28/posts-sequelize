const express = require("express");
const app = express();
const cors = require('cors');
const db = require('./models');
require('dotenv').config({path:"./.env"})
const PORT = 3001 || process.env.PORT;

app.use(cors({
    credentials: true,
}));

app.use(express.json());

const postsRoutes = require('./routes/postsRoutes');
const commentsController = require('./routes/commentsRoutes');
const usersRoutes = require("./routes/usersRoutes");
const likesRoutes = require("./routes/likesRoutes");
const authRoutes = require("./routes/authRoutes");
app.use(authRoutes)
app.use(likesRoutes);
app.use(postsRoutes);
app.use(commentsController);
app.use(usersRoutes);


db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`)); // dapat sa config folder to
    });
