/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - description
 *         - categories
 *         - organizer
 *       properties:
 *         description:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *           description: ID da descrição do evento
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           example: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]
 *           description: Lista de IDs das categorias do evento
 *         organizer:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *           description: ID do organizador do evento
 *         subscriptions:
 *           type: array
 *           items:
 *             type: string
 *           example: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]
 *           description: Lista de IDs das inscrições do evento
 *       example:
 *         description: 507f1f77bcf86cd799439011
 *         categories: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]
 *         organizer: 507f1f77bcf86cd799439011
 *         subscriptions: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     EventDescription:
 *       type: object
 *       required:
 *         - summary
 *         - date
 *         - location
 *         - maxParticipants
 *       properties:
 *         summary:
 *           type: string
 *           example: Conferência de Tecnologia
 *           description: Resumo do evento
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
 *         schedule:
 *           type: string
 *           example: "09:00 - 18:00"
 *           description: Cronograma do evento
 *       example:
 *         summary: Conferência de Tecnologia
 *         date: 2025-12-31T23:59:59Z
 *         location: São Paulo, Brasil
 *         online: false
 *         maxParticipants: 100
 *         schedule: "09:00 - 18:00"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Tecnologia
 *           description: Nome da categoria
 *         description:
 *           type: string
 *           example: Eventos relacionados à tecnologia
 *           description: Descrição da categoria
 *       example:
 *         name: Tecnologia
 *         description: Eventos relacionados à tecnologia
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - user
 *         - event
 *       properties:
 *         user:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *           description: ID do usuário inscrito
 *         event:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *           description: ID do evento
 *         subscriptionDate:
 *           type: string
 *           format: date-time
 *           example: 2025-12-31T23:59:59Z
 *           description: Data da inscrição
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           default: pending
 *           example: pending
 *           description: Status da inscrição
 *       example:
 *         user: 507f1f77bcf86cd799439011
 *         event: 507f1f77bcf86cd799439011
 *         subscriptionDate: 2025-12-31T23:59:59Z
 *         status: pending
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
 *         subscriptions:
 *           type: array
 *           items:
 *             type: string
 *           example: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]
 *           description: Lista de IDs das inscrições do usuário
 *       example:
 *         id: 507f1f77bcf86cd799439011
 *         name: João Silva
 *         email: joao@example.com
 *         password: senha123
 *         role: user
 *         isActive: true
 *         subscriptions: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]
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

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Dados inválidos
 */

/**
 * @openapi
 * /api/subscriptions:
 *   post:
 *     summary: Cria uma nova inscrição
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Dados inválidos
 */

/**
 * @openapi
 * /api/event-descriptions:
 *   post:
 *     summary: Cria uma nova descrição de evento
 *     tags: [EventDescriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventDescription'
 *     responses:
 *       201:
 *         description: Descrição do evento criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventDescription'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     EventDescription:
 *       type: object
 *       required:
 *         - summary
 *         - date
 *         - location
 *         - maxParticipants
 *       properties:
 *         summary:
 *           type: string
 *           example: Conferência de Tecnologia
 *           description: Resumo do evento
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
 *         schedule:
 *           type: string
 *           example: "09:00 - 18:00"
 *           description: Cronograma do evento
 *       example:
 *         summary: Conferência de Tecnologia
 *         date: 2025-12-31T23:59:59Z
 *         location: São Paulo, Brasil
 *         online: false
 *         maxParticipants: 100
 *         schedule: "09:00 - 18:00"
 */