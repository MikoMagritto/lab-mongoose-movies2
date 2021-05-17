const express = require('express');
const router = express.Router();

const Movie = require('../models/movie.js');
const Celebrity = require('../models/celebrity.js')

router.get('/', (req, res, next) => {
    Movie.find()
        .then(movies => res.render('movies/indexMovie', { movies }))
        .catch((err) => next(err));

})

router.get('/new', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => { res.render('movies/new-movie', { celebrities: celebrities }) })
        .catch((err) => next(err));
})

router.post('/', (req, res, next) => {
    const title = req.body.title;
    const genre = req.body.genre;
    const plot = req.body.plot;
    const cast = req.body.cast;

    const movie = new Movie({ title, genre, plot, cast })
    movie.save()
        .then(movie => { res.redirect('/movies') })
        .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
    Movie.findOne({ _id: req.params.id })
        .then(movie => res.render('movies/show-movie', { movie }))
        .catch(err => next(err))

});

router.post('/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(movie => res.redirect('/movies'))
        .catch(err => next(err))
});

router.get('/:id/edit', (req, res, next) => {
    Movie.findOne({ _id: req.params.id })
        .then(movie => res.render('movies/edit-movie', { movie }))
        .catch(err => next(err))
        ;
});

router.post('/:id', (req, res, next) => {
    Celebrity.update({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
        }
    })
        .then(celebrity => res.redirect('/movies'))
        .catch(err => next(err))
        ;
});


// router.get('/:id', (req, res, next) => {
//     Celebrity.findOne({_id: req.params.id})
//       .then(celebrity => res.render('celebrities/show', {celebrity}))
//       .catch(err => next(err))
//     ;



// const express = require('express');
// const router  = express.Router();

// const Celebrity = require('../models/celebrity.js');

// router.get('/', (req, res, next) => {
//   Celebrity.find()
//     .then(celebrities => res.render('celebrities/index', {celebrities}))
//     .catch(err => next(err))
//   ;
// });

// router.post('/', (req, res, next) => {
//   const name = req.body.name;
//   const occupation = req.body.occupation;
//   const catchPhrase = req.body.catchPhrase;

//   const celebrity = new Celebrity({
//     name,
//     occupation,
//     catchPhrase
//   });

//   celebrity.save()
//     .then(celebrity => {
//       res.redirect('/celebrities');
//     })
//     .catch(err => {
//       res.render('celebrities/new');
//     })
//   ;

// });

// router.get('/new', (req, res, next) => {
//   res.render('celebrities/new')
// });

// router.get('/:id', (req, res, next) => {
//   Celebrity.findOne({_id: req.params.id})
//     .then(celebrity => res.render('celebrities/show', {celebrity}))
//     .catch(err => next(err))
//   ;
// });

// router.post('/:id/delete', (req, res, next) => {
//   Celebrity.findByIdAndRemove(req.params.id)
//     .then(celebrity => res.redirect('/celebrities'))
//     .catch(err => next(err))
//   ;
// });

// router.get('/:id/edit', (req, res, next) => {
//   Celebrity.findOne({_id: req.params.id})
//     .then(celebrity => res.render('celebrities/edit', {celebrity}))
//     .catch(err => next(err))
//   ;
// });

// router.post('/:id', (req, res, next) => {
//   Celebrity.update({ _id: req.params.id }, { $set : {
//     name: req.body.name,
//     occupation: req.body.occupation,
//     catchPhrase: req.body.catchPhrase,
//   }})
//     .then(celebrity => res.redirect('/celebrities'))
//     .catch(err => next(err))
//   ;
// });

module.exports = router;