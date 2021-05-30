class App {
  constructor(express, mongoose, config, routes) {
    this.config = config;
    this.mongoose = mongoose;
    this.serverRoutes = routes;
    
    this.app = express();

    this.database();
    this.middlewares(express);
    this.routes();
  }

  database() {
    this.mongoose.connect(this.config.uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    }).then(()=>{
      console.log(`Connection to database established.`)
    }).catch( err=> {
      console.error(`DB error ${err.message}`);
      process.exit(-1)
    });
  }

  middlewares(express) {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.serverRoutes);

    this.app.use((req, res) => {
      console.log(`Path not found::path::${req.path}`)
      return res.status(404).json({message: 'Not found.'});
    });

    this.app.use((error, req, res) => {
      console.error(`Internal Error::path::${req.path}::message::${error.message}`)
      return res.status(500).json({message: err.message});
    })
  }
}

module.exports = (express, mongoose, config, routes) => 
  new App(express, mongoose, config, routes);
