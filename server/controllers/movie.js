let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

//create a reference to the model
let Movie = require('../models/movie');

module.exports.displayMovieList = (req, res, next) => {

    Movie.Model.find((err, data) => {
      if(err)
      {
        console.log(err);
        res.end();
      }
      else
      {
        res.render('movie/list',  
        { title: 'Movie List', 
        movieList: data, 
        displayName: req.user ? req.user.displayName : ''});
      }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('movie/add',  { title: 'Add Movie',
    displayName: req.user ? req.user.displayName : ''})
}

module.exports.processAddPage = (req, res, next) => {
    let newMovie = Movie.Model({
      "title": req.body.title,
      "description": req.body.description,
      "genre": req.body.genre,
      "year": req.body.year,
      "rating": req.body.rating
    });

    Movie.Model.create(newMovie, (err, Movie) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //refresh the movie list
        res.redirect('/movie-list');
      }
    });
}

module.exports.displayEditPage = (req, res, next) => {

    let id = req.params.id;

    Movie.Model.findById(id, (err, movieToEdit) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //show the edit view
        res.render('movie/edit', {titel: 'Edit Movie', data: movieToEdit,
        displayName: req.user ? req.user.displayName : ''})
      }
    });
  }

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updateMovie = Movie.Model({

     "_id": id,
     "title": req.body.title,
     "description": req.body.description,
     "genre": req.body.genre,
     "year": req.body.year,
     "rating": req.body.rating

    });

    Movie.Model.updateOne({_id: id}, updateMovie, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //refresh the movie list
        res.redirect('/movie-list')
      }
    });
  }

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Movie.Model.remove({_id: id}, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //refresh the movie list
        res.redirect('/movie-list')
      }
    });
}