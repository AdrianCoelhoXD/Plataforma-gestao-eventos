const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent, restoreEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const validate = require('../middlewares/validationMiddleware');
const { eventValidationRules } = require('../utils/validators');

const router = express.Router();

/**
 * @openapi
 * /events:
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
router.post('/', authMiddleware, eventValidationRules, validate, createEvent);

/**
 * @openapi
 * /events:
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
router.get('/', getEvents);

/**
 * @openapi
 * /events/{id}:
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
router.put('/:id', authMiddleware, eventValidationRules(), validate, updateEvent);

/**
 * @openapi
 * /events/{id}:
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
router.delete('/:id', authMiddleware, deleteEvent);

/**
 * @openapi
 * /events/{id}/restore:
 *   post:
 *     summary: Restaura um evento excluído
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
 *       200:
 *         description: Evento restaurado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Evento não encontrado
 */
router.post('/:id/restore', authMiddleware, restoreEvent);

module.exports = router;