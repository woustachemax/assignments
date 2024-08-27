const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");


router.post('/signup', async function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    try {
        var userExists = await User.findOne({ username: username });
        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        var newUser = new User({ username: username, password: password });
        await newUser.save();

        res.json({ msg: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/courses', async function(req, res) {
    var username = req.headers.username;
    var password = req.headers.password;

    try {
        var userExists = await User.findOne({ username: username, password: password });
        if (!userExists) {
            return res.status(401).json({ msg: "Unauthorized: Invalid credentials" });
        }

        var courses = await Course.find().select('title description price imageLink published');

        var formattedCourses = courses.map(function(course) {
            return {
                id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                imageLink: course.imageLink,
                published: course.published
            };
        });

        res.json({ courses: formattedCourses });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/courses/:courseId', userMiddleware, async function(req, res) {
    var courseId = req.params.courseId;
    var username = req.headers.username;
    var password = req.headers.password;

    try {
        var user = await User.findOne({ username: username, password: password });
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: Invalid credentials" });
        }

        var course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        user.purchasedCourses = user.purchasedCourses || [];
        user.purchasedCourses.push(course._id);
        await user.save();

        res.json({ msg: "Course purchased successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/purchasedCourses', userMiddleware, async function(req, res) {
    var username = req.headers.username;
    var password = req.headers.password;

    try {
        var user = await User.findOne({ username: username, password: password }).populate('purchasedCourses');
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized: Invalid credentials" });
        }

        var purchasedCourses = user.purchasedCourses.map(function(course) {
            return {
                id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                imageLink: course.imageLink,
                published: course.published
            };
        });

        res.json({ purchasedCourses: purchasedCourses });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
