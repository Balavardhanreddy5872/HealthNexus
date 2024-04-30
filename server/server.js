import express, { json } from "express";
import { config } from 'dotenv';
const app = express();
import mongoose from 'mongoose';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import productRoutes from './routes/ProductRoutes.js';
import labRoutes from './routes/labRoutes.js';
import User from "./models/Doctorreg_m.js";
import mRoutes from "./routes/mRoutes.js";
import Patient from "./models/PatientReg.js";
import bodyParser from 'body-parser';
import multer from 'multer';
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
config();


//Connection to database 
const dbUrl = 'mongodb://0.0.0.0:27017/shopping'
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database.');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDirectory = join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1h',
  path: logDirectory
});

app.use(cors({ credentials: true }));
app.use(json());
app.use(morgan('combined', { stream: accessLogStream })); // Use combined format for logging
app.use(bodyParser.json());


// Routes  middlewares 
app.use("/api/auth", authRouter);
app.use("/api/product", productRoutes);
app.use("/api/lab", labRoutes)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use("/api/blog", mRoutes);


const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "HealthNexus",
      version: "2.0.0",
      description: "API application made with express and documented with swaggerAPI"
    },
    servers: [
      {
        url: "http://localhost:8081/",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>"
        }
      }
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerjsdoc(options);

app.use(
  "/api-docs",
  swaggerui.serve,
  swaggerui.setup(specs)
)




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ filename: req.file.filename });
});


app.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const { name,
      email,
      address,
      phoneNumber,
      specialization,
      experience } = req.body;
    const profileImage = req.file ? req.file.filename : null;
    const newUser = await User.create({
      name,
      email,
      address,
      phoneNumber,
      specialization,
      experience,
      profileImage
    });
    res.json(newUser)
    // res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Requests
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to HealthNexus  app",
  });
});


app.post("/patientdetails", async (req, res) => {
  const {
    patientName,
    patientEmail,
    patientPhone,
    appointmentDate,
    specialization,
    reason } = req.body
  console.log(patientEmail)
  try {
    const userDoc = await Patient.create({
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      specialization,
      reason,
    })

    res.json(userDoc)

  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
});


app.get('/UserPat', async (req, res) => {
  try {
    const data = await Patient.find({})
    if (data) {
      res.status(200).json(data);
    }
    else {
      res.status(400).json("Wrong Credientials")
    }
  } catch (err) {
    res.status(400).json(err)
  }
})


app.get('/alldoctors', async (req, res) => {
  try {
    const data = await User.find({})
    if (data) {
      res.status(200).json(data);
    }
    else {
      res.status(400).json("Something went wrong")
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.put("/updateStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedDoctor = await User.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor status:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get('/doctordet', async (req, res) => {
  try {
    const data = await User.find({})
    if (data) {
      res.status(200).json(data);
    }
    else {
      res.status(400).json("Wrong Credientials")
    }
  } catch (err) {
    res.status(400).json(err)
  }
})


app.get('/UserPat2', async (req, res) => {
  try {
    const data = await Patient.find({})
    if (data) {
      res.status(200).json(data);
    }
    else {
      res.status(400).json("Wrong Credientials")
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

app.get('/UserPat3', async (req, res) => {
  try {
    const data = await Patient.find({})
    if (data) {
      res.status(200).json(data);
    }
    else {
      res.status(400).json("Wrong Credientials")
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

app.get('/doctorres', async (req, res) => {
  try {
    const data = await User.find({})
    if (data) {
      res.status(200).json(data);
    }
    else {
      res.status(400).json("Wrong Credientials")
    }
  } catch (err) {
    res.status(400).json(err)
  }
})



app.post('/login', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log(user)
  if (user) {
    res.json({ id: user._id })
  } else {
    res.status(401).send('Authentication failed');
  }
});

app.post('/doctprofile', async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({
      email: user.email,
      name: user.name,
      specialization: user.specialization,
      profileImage: user.profileImage,
      address: user.address,
      phoneNumber: user.phoneNumber,
      experience: user.experience,
    });

  } catch (error) {
    res.status(500).send('Server error');
  }
});


app.post('/updateAppointmentStatus', async (req, res) => {
  const { appointmentId, status, prescription } = req.body;

  try {
    const appointmentToUpdate = await Patient.findByIdAndUpdate(
      appointmentId,
      { $set: { status, prescription } }, // Updated to include prescription if available
      { new: true }
    );

    if (!appointmentToUpdate) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment status updated successfully' });
  } catch (err) {
    console.error('Failed to update appointment status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/UserPat3', async (req, res) => {
  try {
    const data = await Patient.find({})
    if (data) {
      res.status(200).json(data);
    }
    else {
      res.status(400).json("Wrong Credientials")
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

//Local host port number 
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});