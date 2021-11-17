let teacherList = [];
let studentList = [];
let homeworkList = [];
let teacherId = 0
let studentId = 0
let homeworkId = 0

let paramHw = 0 //due to error on onChangeDt2()


class Homework {

    constructor(homework_id, homework_name, title, date, students = []) {
        this.homework_id = homework_id;
        this.homework_name = homework_name;
        this.title = title;
        this.date = date;
        this.students = students;

    }

    toString() {
        return 'name: ${this.homework_name} \n title: ${this.title} \n date: $this.date \n'
    }
}
class Teacher {
    constructor(teacher_id, teacher_name, students = []) {
        this.teacher_id = teacher_id;
        this.teacher_name = teacher_name;
        this.students = students;
    }

    toString() {
        return 'name: ${this.teacher_name} \n students: ${this.students} \n homeworks: $this.homeworks \n'
    }

    addHomework(homeworkId, homework_name, title, date, student) {
        let newHomework = new Homework(homeworkId++, homework_name, title, date, student)
        student.homeworks.push(newHomework)
        homeworkList.push(newHomework)
        createDropdownHomework()
    }
}

class Student {

    constructor(student_id, student_name, homeworks = [], teachers = []) {
        this.student_id = student_id;
        this.student_name = student_name;
        this.homeworks = homeworks;
        this.teachers = teachers;
    }

    toString() {
        return 'name: ${this.student_name} \n homeworks: ${this.homeworks} \n teachers: $this.teachers \n'
    }
}



class trackingPlatform {

    addTeacher() {
        //let paramId = document.getElementById("teacher_id").value

        /*if(isIdInTeacherList())
            alert("Given Id is exist. Try another one!")
        else if(isNaN(teacherId))
            alert("Given Id is not a number. Try another one!")
        else{}*/
        if (document.getElementById("teacher_name").value == null) {
            alert("Null Value")
        } else {
            let newTeacher = new Teacher(teacherId++, document.getElementById("teacher_name").value);
            teacherList.push(newTeacher);
            createDropdownTeacher();
            return newTeacher;
        }




    }

    addStudent() {
        /*let paramId = document.getElementById("student_id").value
        if(isIdInStudentList())
            alert("Given Id is exist. Try another one!")
        else if(isNaN(paramId))
            alert("Given Id is not a number. Try another one!")
        else{}*/
        if (document.getElementById("student_name").value == null) {
            alert("Null Value")
        } else {
            let newStudent = new Student(studentId++, document.getElementById("student_name").value);
            studentList.push(newStudent);
            createDropdownStudent();
            return newStudent
        }

    }

    giveHomework() {
        if(studentList[onChangeDs2()] == null)
            alert("Fill in the required information")
        else
            teacherList[paramHw].addHomework(homeworkId,
            document.getElementById("homework_name").value,
            document.getElementById("title").value,
            document.getElementById("date").value,
            studentList[onChangeDs2()])
    }

    associate() {
        if (isIdInTeacherList()) {
            alert("This teacher and student are associated")
        } else {
            teacherList[onChangeDt()].students.push(studentList[onChangeDs()])
            studentList[onChangeDt()].teachers.push(teacherList[onChangeDs()])
        }

    }



}

function createDropdownTeacher() {
    var option = "";
    for (var i = 0; i < teacherList.length; i++) {
        option += '<option value="' + teacherList[i].teacher_id + '">' + teacherList[i].teacher_name + "</option>"

    }
    document.getElementById("DdTeacherList").innerHTML = option;
    document.getElementById("DdTeacherList2").innerHTML = option;

}

function createDropdownStudent() {
    var option = "";
    for (var i = 0; i < studentList.length; i++) {
        option += '<option value="' + studentList[i].student_id + '">' + studentList[i].student_name + "</option>"

    }
    document.getElementById("DdStudentList").innerHTML = option;
    document.getElementById("DdStudentList3").innerHTML = option;


}

function createDropdownStudent2(studentList) {
    var option = "";
    for (var i = 0; i < studentList.length; i++) {
        option += '<option value="' + studentList[i].student_id + '">' + studentList[i].student_name + "</option>"

    }
    document.getElementById("DdStudentList2").innerHTML = option;

}

function createDropdownHomework() {
    var option = "";
    for (var i = 0; i < homeworkList.length; i++) {
        option += '<option value="' + homeworkList[i].homework_name + '">' + homeworkList[i].homework_name + "</option>"

    }
    document.getElementById("DdHomeWorkList").innerHTML = option;
}

function createDropdownHomework2(homeworkList) {
    var option = "";
    for (var i = 0; i < homeworkList.length; i++) {
        option += '<option value="' + homeworkList[i].homework_name + '">' + homeworkList[i].homework_name + "</option>"

    }
    document.getElementById("DdHomeWorkList2").innerHTML = option;
}


function onChangeDt() {
    var e = document.getElementById("DdTeacherList");
    var strUser = e.value;
    return strUser;
}

function onChangeDs() {
    var e = document.getElementById("DdStudentList");
    var strUser = e.value;
    return strUser;
}
function onChangeDt2() {
    var e = document.getElementById("DdTeacherList2");
    var strUser = e.value;
    createDropdownStudent2(teacherList[strUser].students)
    paramHw = strUser
    return strUser;
}

function onChangeDs2() {
    var e = document.getElementById("DdStudentList2");
    var strUser = e.value;
    return strUser;
}

function onChangeDs3() {
    var e = document.getElementById("DdStudentList3");
    var strUser = e.value;
    createDropdownHomework2(studentList[strUser].homeworks)
    return strUser;
}

function onChangeDh() {
    var e = document.getElementById("DdHomeWorkList");
    var strUser = e.value;
    return strUser;
}

function onChangeDh2() {
    var e = document.getElementById("DdHomeWorkList2");
    var strUser = e.value;
    return strUser;
}

function onChangeDp() {
    if (document.getElementById("personlist").value == "admin") {
        document.getElementById("studentMenu").style.visibility = "hidden";
        document.getElementById("teacherMenu").style.visibility = "hidden";
        document.getElementById("adminMenu").style.visibility = "visible";
    }
    else if (document.getElementById("personlist").value == "teachers") {
        document.getElementById("adminMenu").style.visibility = "hidden";
        document.getElementById("studentMenu").style.visibility = "hidden";
        document.getElementById("teacherMenu").style.visibility = "visible";
        document.getElementById("teacherMenu").style.position = "absolute";
        document.getElementById("teacherMenu").style.top = "300px";


    }
    else {
        document.getElementById("adminMenu").style.visibility = "hidden";
        document.getElementById("teacherMenu").style.visibility = "hidden";
        document.getElementById("studentMenu").style.visibility = "visible";
        document.getElementById("studentMenu").style.position = "absolute";
        document.getElementById("studentMenu").style.top = "300px";
    }

}

function isIdInTeacherList() {
    var flag = false
    teacherList[onChangeDt()].students.forEach(element => {
        if (element.student_id == onChangeDs())
            flag = true
    });

    return flag;
}

function submission() { //ref: https://www.w3schools.com/jsref/prop_fileupload_files.asp
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("pFileUpload").innerHTML = txt;
}

function loginCheck() {
    //location.href = "index.html";    
    if (document.getElementById("username_id").value === "admin" &&
        document.getElementById("psw").value == "1234")
        location.href = "index.html";
    else
        alert("user/password incorrect")
};



/*function isIdInStudentList() {
    var flag = false
    studentList.forEach(element => {
        if (element.student_id == document.getElementById("student_id").value)
            flag = true
    });

    return flag;
}*/


tp = new trackingPlatform();


