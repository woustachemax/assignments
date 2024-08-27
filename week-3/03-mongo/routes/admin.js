const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const userExists = await Admin.findOne({username: username});

    if(userExists){
        res.status(404).send("User exists");
    }

    const admin = new Admin({
        name: username,
        password: password
    })

    admin.save();
    res.json({msg: 'Admin created successfully'});
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic

    const username = req.headers.username;
    const password=req.headers.password;
    const title = req.body.title;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const imageLink = req.body.imageLink;

    const nayacourse= new Course({
        username: username,
        password: password,
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
    });

    nayacourse.save();
    res.json({
        msg: 'Course created successfully', courseId: nayacourse._id
    });
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const username=  req.headers.username;
    const password= req.headers.password;
    const admin = admin.findOne({username:username, password:password})
    if(!admin){
        res.send(400).json({msg: "kon hai bey tu?"})
    }

    const courses = await Course.find().select('title desc and imageLink published');

    const formattedCourse = courses.map(function(course){
        return
        {
        id = course._id,
        title = course.title,
        description = course.description,
        price = course.price, 
        imageLink =course.imageLink,
        published = course.published 
    }
    })

    res.json({courses: formattedCourse});
});

module.exports = router;