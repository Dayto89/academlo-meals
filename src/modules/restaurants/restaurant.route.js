import express from 'express';
import { createRestaurant, createReview, deleteReview, findAllRestaurants, findOneRestaurant, updateReview, updateRestaurant, deleteRestaurant } from './restaurant.controller.js';
import { protect, protectAccountOwner } from '../users/user.middleware.js';
import { validExistRestaurant, validExistReview } from './restaurant.middleware.js';

export const router = express.Router()

router.use(protect)

router.route('/').post( createRestaurant).get(findAllRestaurants)

router.route('/:id').get(findOneRestaurant).patch( protectAccountOwner, updateRestaurant).delete(deleteRestaurant)

router.post('/reviews/:id',validExistRestaurant, createReview)

router.route('/reviews/:restaurantIs/:id').patch( protectAccountOwner, updateReview).delete(validExistRestaurant, validExistReview, protectAccountOwner, deleteReview)  
