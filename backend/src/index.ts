import express  from "express";
import cors from "cors";
import path from "path"
import morgan from "morgan"
import routes from "./routes/main.routes";
import { AppDataSource } from "./data-source";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket/socket";

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(path.join(__dirname,'../')))

const PORT = 4100;

app.use('',routes);

// const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173', // React app URL
//     methods: ['GET', 'POST']
//   }
// });

// setupSocket(io);


AppDataSource.initialize().then(async () =>{
    console.log("DataBase Connected")
})

app.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running at http://localhost:${PORT}`);
});


// harmisha@kanhasoft.com 