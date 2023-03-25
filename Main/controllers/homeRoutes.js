const router = require('express').Router();
const { interests, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all interests and JOIN with user data
    const interestsData = await interests.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const movieInterests = interestData.filter(interest => interest.category === "movie")


    // Pass serialized data and session flag into template
    res.render('homepage', { 
      interests
, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/interests/:id', async (req, res) => {
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

// Use withAuth middleware to prevent access to route
router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: interests }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    // res.render('homepage', {
    //   ...user,
    //   logged_in: true
    // });
    res.render('homepage');
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

module.exports = router;
