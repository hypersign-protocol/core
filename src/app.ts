import express  from 'express';
import routes from './routes';
import swaggerJsDoc = require('./swagger.json');
import swaggerUi from 'swagger-ui-express';
import { PORT, baseUrl, logger, db, whitelistedUrls } from './config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import cors from 'cors';

const app = express();

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     message: 'Too many requests' // message to send
//   });
  

function corsOptionsDelegate (req, callback) {
  let corsOptions;
  if (whitelistedUrls.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}



app.use(helmet());
// app.use(limiter);
app.use(xss());
app.use(cors(corsOptionsDelegate)); 
app.use(express.json({ limit: '10kb' }));

// app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc))
app.use('/api/v1/did', routes.did);
app.use('/api/v1/schema', routes.schema);

app.listen(PORT, () => console.log('Server is running @ ' + baseUrl));

