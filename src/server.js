import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './model.js';
import contractsRoutes from './routes/contracts.routes.js'
import jobsRoutes from './routes/jobs.routes.js';

const app = express();
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use(express.json());
app.use(bodyParser.json());
app.use(contractsRoutes);
app.use(jobsRoutes);

export default app;

init();

async function init() {
  try {
    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
