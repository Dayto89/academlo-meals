import express from 'express';
import { createOrder, findAllOrdersUser, updateStatusCancelled, updateStatusCompleted } from './order.controller.js';
import { protect, protectAccountOwner } from '../users/user.middleware.js';

export const router = express.Router()

router.use(protect)

router.post('/', createOrder)

router.get('/me', findAllOrdersUser)

router.route('/:id').patch(updateStatusCompleted).delete(updateStatusCancelled)