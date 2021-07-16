import express from 'express';
import { body, validationResult } from 'express-validator';
import xss from 'xss';
import {
  list, insert, query, deleteRow,
} from './db.js';
import { ensureLoggedIn, catchErrors } from './utils.js';

export const router = express.Router();

/**
 * Higher-order fall sem umlykur async middleware með villumeðhöndlun.
 *
 * @param {function} fn Middleware sem grípa á villur fyrir
 * @returns {function} Middleware með villumeðhöndlun

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
} */

async function index(req, res) {
  const errors = [];
  const formData = {
    name: '',
    nationalId: '',
    anonymous: false,
    comment: '',
  };

  const result = await query('SELECT COUNT(*) AS count FROM signatures;');
  const numberOfItems = Number(result.rows[0].count);
  const ITEMS_PER_PAGE = 50;
  const page = +req.query.page || 1;

  const registrations = await list((page - 1) * ITEMS_PER_PAGE);

  res.render('index', {
    errors,
    formData,
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

const nationalIdPattern = '^[0-9]{6}-?[0-9]{4}$';

const validationMiddleware = [
  body('name')
    .isLength({ min: 1 })
    .withMessage('Nafn má ekki vera tómt'),
  body('name')
    .isLength({ max: 128 })
    .withMessage('Nafn má að hámarki vera 128 stafir'),
  body('nationalId')
    .isLength({ min: 1 })
    .withMessage('Kennitala má ekki vera tóm'),
  body('nationalId')
    .matches(new RegExp(nationalIdPattern))
    .withMessage('Kennitala verður að vera á formi 000000-0000 eða 0000000000'),
  body('comment')
    .isLength({ max: 400 })
    .withMessage('Athugasemd má að hámarki vera 400 stafir'),
];

// Viljum keyra sér og með validation, ver gegn „self XSS“
const xssSanitizationMiddleware = [
  body('name').customSanitizer((v) => xss(v)),
  body('nationalId').customSanitizer((v) => xss(v)),
  body('comment').customSanitizer((v) => xss(v)),
  body('anonymous').customSanitizer((v) => xss(v)),
];

const sanitizationMiddleware = [
  body('name').trim().escape(),
  body('nationalId').blacklist('-'),
];

async function validationCheck(req, res, next) {
  const {
    name, nationalId, comment, anonymous,
  } = req.body;

  const result = await query('SELECT COUNT(*) AS count FROM signatures;');
  const numberOfItems = Number(result.rows[0].count);
  const ITEMS_PER_PAGE = 50;
  const page = +req.query.page || 1;

  const registrations = await list((page - 1) * ITEMS_PER_PAGE);
  const formData = {
    name, nationalId, comment, anonymous,
  };

  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.render('index', {
      formData,
      errors: validation.errors,
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

  return next();
}

async function register(req, res) {
  const {
    name, nationalId, comment, anonymous,
  } = req.body;

  let success = true;

  try {
    success = await insert({
      name, nationalId, comment, anonymous,
    });
  } catch (e) {
    console.error(e);
  }

  if (success) {
    return res.redirect('/');
  }

  return res.render('error', { title: 'Gat ekki skráð!', text: 'Hafðir þú skrifað undir áður?' });
}

/**
 * Route til að eyða undirskrift, tekur við `id` í `body` og eyðir.
 * Aðeins aðgengilegt fyrir innskráðan notanda.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function deleteSignature(req, res) {
  const { id } = req.body;

  let result = null;

  try {
    result = await deleteRow(id);
  } catch (e) {
    console.error(e);
  }

  if (result.rowCount === 1) {
    return res.redirect('/admin');
  }

  return res.render('error', { title: 'Gat ekki eytt!', text: 'Villa við að eyða úr gagnagrunni' });
}

router.get('/', catchErrors(index));

router.post('/delete', ensureLoggedIn, catchErrors(deleteSignature));
router.post(
  '/',
  validationMiddleware,
  xssSanitizationMiddleware,
  catchErrors(validationCheck),
  sanitizationMiddleware,
  catchErrors(register),
);
