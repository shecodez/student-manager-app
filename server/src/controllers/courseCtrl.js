import db from './../models';
import parseErrors from './../utils/parseErrors';

const courseController = {};

courseController.getAll = (req, res) => {
	db.Course.find({})
		.then(courses => {
			return res.status(200).json({ courses });
		})
		.catch(err => {
			return res.status(500).json(err);
		});
};

courseController.getOne = (req, res) => {
	db.Course.findById(req.params.id)
		.populate({
			path: 'instructor_id',
			select: 'firstName lastName -_id'
		})
		.then(course => {
			return res.status(200).json({ course });
		})
		.catch(err => {
			return res.status(500).json(err);
		});
};

courseController.getInstructorCourses = (req, res) => {
	db.Course.find({
		instructor_id: req.params.instructorId
	})
		.where('isDeleted')
		.equals(false)
		.then(courses => {
			return res.status(200).json({ courses });
		})
		.catch(err => {
      return res.status(500).json(err);
			/* return res.status(400).json({
				errors: parseErrors(err.errors)
			}); */
		});
};

// create new course
courseController.create = (req, res) => {
	const { name, description, startDate, endDate, instructor_id } = req.body.course;

	// authentication
	// Validations

	const course = new db.Course({
		name,
    description,
    startDate,
    endDate,
    instructor_id
	});

	course
		.save()
		.then(newCourse => {
      // create new Audit type:NEW
			return res.status(200).json({ course: newCourse });
		})
		.catch(err => {
			return res.status(500).json(err);
		});
};


courseController.update = (req, res) => {
	const { name, description, startDate, endDate, instructor_id } = req.body.course;
	db.Course.findByIdAndUpdate(
		req.params.id,
		// Validations
		{
			$set: {
        name,
        description,
        startDate,
        endDate,
        instructor_id
			}
		},
		{ new: true }
	)
		.then(updatedCourse => {
      // create new Audit type:EDIT
			res.status(200).json({ course: updatedCourse });
		})
		.catch(err => {
			res.status(500).json(err);
		});
};

courseController.delete = (req, res) => {
	db.Course.findByIdAndUpdate(
		req.params.id,
		{ isDeleted: true },
		{ new: true }
	)
		.then(updatedCourse => {
      // create new Audit type:DELETE
			res.status(200).json('Course successfully deleted.');
		})
		.catch(err => {
			res.status(500).json(err);
		});
};

export default courseController;
