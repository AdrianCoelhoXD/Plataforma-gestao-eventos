// services/schemas.js

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
 *           example: Evento de Tecnologia
 *           description: Mulher Tech
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
 *           example: Paraiba, Brasil
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

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @openapi
 * /api/deactivate:
 *   post:
 *     summary: Desativa a conta do usuário
 *     description: Desativa a conta do usuário autenticado. Requer um token JWT válido.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conta desativada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeactivateAccountResponse'
 *       401:
 *         description: Não autorizado (token ausente ou inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acesso negado. Token não fornecido."
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Usuário não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao desativar conta"
 */

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Exclui permanentemente um usuário
 *     description: Exclui permanentemente um usuário do banco de dados. Requer autenticação.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser excluído
 *     responses:
 *       200:
 *         description: Usuário excluído permanentemente com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Usuário excluído permanentemente com sucesso"
 *       401:
 *         description: Não autorizado (token ausente ou inválido)
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @openapi
 * /api/events:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */

/**
 * @openapi
 * /api/events:
 *   get:
 *     summary: Retorna todos os eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */

/**
 * @openapi
 * /api/events/{id}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Evento não encontrado
 */

/**
 * @openapi
 * /api/events/{id}:
 *   delete:
 *     summary: Exclui um evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     responses:
 *       204:
 *         description: Evento excluído com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Evento não encontrado
 */