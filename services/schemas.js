/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - date
 *         - location
 *         - maxParticipants
 *       properties:
 *         title:
 *           type: string
 *           example: Conferência de Tecnologia
 *           description: Título do evento
 *         description:
 *           type: string
 *           example: Um evento sobre as últimas tendências em tecnologia.
 *           description: Descrição do evento
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2025-12-31T23:59:59Z
 *           description: Data e hora do evento
 *         location:
 *           type: string
 *           example: São Paulo, Brasil
 *           description: Local do evento
 *         online:
 *           type: boolean
 *           default: false
 *           example: false
 *           description: Indica se o evento é online
 *         maxParticipants:
 *           type: integer
 *           example: 100
 *           description: Número máximo de participantes
 *         participants:
 *           type: array
 *           items:
 *             type: string
 *             example: 507f1f77bcf86cd799439011
 *           description: Lista de IDs dos participantes
 *       example:
 *         title: Conferência de Tecnologia
 *         description: Um evento sobre as últimas tendências em tecnologia.
 *         date: 2025-12-31T23:59:59Z
 *         location: São Paulo, Brasil
 *         online: false
 *         maxParticipants: 100
 *         participants: []
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *           description: ID único do usuário
 *         name:
 *           type: string
 *           example: João Silva
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           example: joao@example.com
 *           description: E-mail do usuário
 *         password:
 *           type: string
 *           format: password
 *           example: senha123
 *           description: Senha do usuário (hash)
 *         role:
 *           type: string
 *           enum: [user, organizer]
 *           default: user
 *           example: user
 *           description: Papel do usuário (usuário comum ou organizador)
 *         isActive:
 *           type: boolean
 *           default: true
 *           example: true
 *           description: Indica se a conta do usuário está ativa
 *       example:
 *         id: 507f1f77bcf86cd799439011
 *         name: João Silva
 *         email: joao@example.com
 *         password: senha123
 *         role: user
 *         isActive: true
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: João Silva
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           example: joao@example.com
 *           description: E-mail do usuário
 *         password:
 *           type: string
 *           format: password
 *           example: senha123
 *           description: Senha do usuário
 *       example:
 *         name: João Silva
 *         email: joao@example.com
 *         password: senha123
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: joao@example.com
 *           description: E-mail do usuário
 *         password:
 *           type: string
 *           format: password
 *           example: senha123
 *           description: Senha do usuário
 *       example:
 *         email: joao@example.com
 *         password: senha123
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     DeactivateAccountResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *           description: Indica se a operação foi bem-sucedida.
 *         message:
 *           type: string
 *           example: "Conta desativada com sucesso"
 *           description: Mensagem de sucesso ou erro.
 */