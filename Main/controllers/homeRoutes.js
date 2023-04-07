const router = require('express').Router();
const { Interests, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});


router.get('/actualsavs', withAuth, async (req, res) => {
  try{
    const interestsData = await Interests.findAll({
      raw:true,
      where: { userId: req.session.user_id, },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
console.log(interestsData)

    // Serialize data so the template can read it
    // const projects = interestsData.map((project) => project.get({ plain: true }));
    // const movies = projects.filter(sav => sav.category == 'movies');
    res.render('actualsavs', { 
      interests: interestsData
, 
      logged_in: req.session.logged_in
    });

  } catch(error){ 
    if(error) console.log(error)
  };
})

router.get('/interests/:id', async (req, res) => {

  try {
    const interestsData = await Interests.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const interests = interestsData.get({ plain: true });

    res.render('interests', {
      ...interests,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    console.log(req.session.user_id);
    const interestsData = await Interests.findAll(
      
      {where: {userId : req.session.user_id},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const interests = interestsData.map((project) => project.get({ plain: true }));
    console.log (interests);
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Interests }],
    // });

    // const user = userData.get({ plain: true });
    // console.log(user);
    
    res.render('homepage', {
      interests,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});


router.get('/category/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    console.log(req.session.user_id);
    const interestsData = await Interests.findAll(
      
      {where: {userId : req.session.user_id, category: req.params.id},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      
    });

    const interests = interestsData.map((project) => project.get({ plain: true }));
    console.log (interests);
    
    res.render('categories', {
      interests,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/category/', async (req, res) => {
  try {
    const interestsData = await interests.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const interests = interestsData.get({ plain: true });

    res.render('interests', {
      ...interests,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//list
router.get('/list', async (req, res) => {
  res.render('seesavslist')
})

///
router.get('/filtered/:category', withAuth, async (req, res) => {
  console.log(req.params.category)
  try{
    const interestsData = await Interests.findAll({
      raw:true,
      where: { userId: req.session.user_id,category:req.params.category},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    res.render('actualsavs', { 
      interests: interestsData
, 
      logged_in: req.session.logged_in
    });

  } catch(error){ 
    if(error) console.log(error)
  };
})





module.exports = router;
