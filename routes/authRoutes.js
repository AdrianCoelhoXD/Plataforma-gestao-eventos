const { register, login } = require('../controllers/loginController');

const router = express.Router();

// Rotas de autenticação
router.post('/register', register); // Registrar usuário
router.post('/login', login); // Login de usuário

module.exports = router;
