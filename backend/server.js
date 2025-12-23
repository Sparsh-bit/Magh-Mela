require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const bookingsRouter = require('./routes/bookings');
const paymentsRouter = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
// Disable helmet's default contentSecurityPolicy because admin.html uses a small inline script
// for the lightweight admin UI. For production, move scripts to separate files and configure CSP properly.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
// Capture raw body for webhook verification
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
app.use(morgan('tiny'));

// Routes
app.use('/api/bookings', bookingsRouter);
app.use('/api/payments', paymentsRouter);

// Serve admin static page
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Connect to MongoDB and start server
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/magh-mela';

mongoose.connect(MONGODB_URI, { autoIndex: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });
