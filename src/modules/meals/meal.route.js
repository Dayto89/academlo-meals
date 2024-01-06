import express from 'express';
import { createMeal, deleteMeal, findAllMeals, findOneMeal, updateMeal } from './meal.controller.js';
import { protect, protectAccountOwner } from '../users/user.middleware.js';

export const router = express.Router()

router.route('/:id').post(protect, protectAccountOwner, createMeal).get(findOneMeal).patch(protect, protectAccountOwner, updateMeal).delete(protect, protectAccountOwner, deleteMeal)   

router.get('/', findAllMeals)
