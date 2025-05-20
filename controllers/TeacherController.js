class TeacherController {

    static create = (req, res) => {
        res.render('teacher/create')
    }

    static display = (req, res) => {
        res.render('teacher/display')
    }
}
module.exports = TeacherController