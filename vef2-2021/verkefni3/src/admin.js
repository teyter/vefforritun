import express from 'express';

// TODO útfæra „bakvinnslu“
import { ensureLoggedIn, catchErrors } from './utils.js';
import { query, list } from './db.js';

export const router = express.Router();

/**
 * Route fyrir lista af notendum.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function userRoute(req, res) {
  const result = await query('SELECT COUNT(*) AS count FROM signatures;');
  const numberOfItems = Number(result.rows[0].count);
  const ITEMS_PER_PAGE = 50;
  const page = +req.query.page || 1;

  const registrations = await list((page - 1) * ITEMS_PER_PAGE);

  return res.render('admin', {
    registrations,
    numberOfItems,
    currentPage: page,
    hasNextPage: (ITEMS_PER_PAGE * page) < numberOfItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(numberOfItems / ITEMS_PER_PAGE),
  });
}

router.get('/', ensureLoggedIn, catchErrors(userRoute));
