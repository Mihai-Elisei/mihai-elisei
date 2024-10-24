const router = require("express").Router();

const {
  Intro,
  About,
  Project,
  Contact,
  Experience,
  Course
} = require("../models/portofolioModel");

const User = require("../models/userModel");

router.get("/get-portofolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const contacts = await Contact.find();
    const experiences = await Experience.find();
    const courses = await Course.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      projects: projects,
      contact: contacts[0],
      experiences: experiences,
      courses: courses
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

//update intro
router.post("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro Updated Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//update about
router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "About Updated Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//add experience
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added successfuly"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//update experience
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Updated Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//delete experience
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete({
      _id: req.body._id
    });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Deleted Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//add project
router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfuly"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//update project
router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: project,
      success: true,
      message: "Project Updated Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//delete project
router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete({
      _id: req.body._id
    });
    res.status(200).send({
      data: project,
      success: true,
      message: "Project Deleted Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//add course
router.post("/add-course", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(200).send({
      data: course,
      success: true,
      message: "Course added successfuly"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//update course
router.post("/update-course", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: course,
      success: true,
      message: "Course Updated Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//delete course
router.post("/delete-course", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete({
      _id: req.body._id
    });
    res.status(200).send({
      data: course,
      success: true,
      message: "Course Deleted Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//update contact
router.post("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: contact,
      success: true,
      message: "Contact Updated Successfuly"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

//admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password
    });
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login successfuly"
      });
    } else {
      res.status(200).send({
        data: user,
        success: false,
        message: "Invalid username or password"
      });
    }
  } catch (error) {}
});

module.exports = router;
