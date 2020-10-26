let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let movieController = require('../controllers/movie');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Movie-List page. */
router.get('/', movieController.displayMovieList);

/* GET Route for displaying the Add page - Create Operation */
router.get('/add', requireAuth, movieController.displayAddPage);

/* POST Route for processing the Add page - Create Operation */
router.post('/add', requireAuth, movieController.processAddPage); 

/* GET Route for displaying the Edit page - Update Operation */
router.get('/edit/:id', requireAuth, movieController.displayEditPage); 

/* POST Route for displaying the Edit page - Update Operation */
router.post('/edit/:id', requireAuth, movieController.processEditPage);

/* GET to perform Deletion - Delete Operation */
router.get('/delete/:id', requireAuth, movieController.performDelete);
 
module.exports = router;