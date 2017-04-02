/* jshint esversion: 6 */

var teachers, lectures, schools, auditoriums;

var teachers = [
	{
		"name": "Трофимов"
	},
	{
		"name": "Яковлев"
	},
	{
		"name": "Цыплухин"
	}
];

var lectures = [
	{
		"name": "Параллельные и распределенные вычисления",
		"teacher": "Яковлев",
		"auditorium": "Синий Кит",
		"date": "",
		"duration": {
			"start": new Date(2017, 4, 1, 12, 0, 0),
			"end": new Date(2017, 4, 1, 13, 30, 0)
		},
		"schools": ["Школа разработки интерфейсов", "Школа дизайна"]
	}
];

var auditoriums = [
	{
		"name": "Синий Кит",
		"capacity": 100,
		"location": "Yandex HQ"
	},
	{
		"name": "Вертолетная площадка",
		"capacity": 75,
		"location": "Yandex HQ"
	},
	{
		"name": "Мобилизация",
		"capacity": 250,
		"location": "Yandex HQ"
	},
	{
		"name": "Маркет",
		"capacity": 125,
		"location": "Yandex HQ"
	}
];

var schools = [
	{
		"name": "Школа менеджмента",
		"students": 100
	},
	{
		"name": "Школа разработки интерфейсов",
		"students": 75
	},
	{
		"name": "Школа мобильного дизайна",
		"students": 25
	},
	{
		"name": "Школа мобильной разработки",
		"students": 50
	}
];

function isLocalStorageAvailable() {
	try {
		var storage = window.localStorage, x = "Test";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

class sync {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}
}
// Функция проверяет, существует ли заданное значение в массиве teachers.
function findTeacher(value, returnType) {
	let i;
	if(returnType) {
		for(i = 0; i < teachers.length; i++) {
			if(value == teachers[i].name) {
				return teachers[i];
			}
		}
		return false;
	}
	else {
		for(i = 0; i < teachers.length; i++) {
			if(value == teachers[i].name) {
				return true;
			}
		}
		return false;
	}
}

// Функция проверяет, существует ли заданное значение в массиве lectures.
function findLecture(value, returnType) {
	let i;
	if(returnType) {
		for(i = 0; i < lectures.length; i++) {
			if(value == lectures[i].name) {
				return lectures[i];
			}
		}
		return false;
	}
	else {
		for(i = 0; i < lectures.length; i++) {
			if(value == lectures[i].name) {
				return true;
			}
		}
		return false;
	}
}

// Функция проверяет, существуют ли заданные школы (value), а так же учитывает количество школ для лекции (num).
function findSchools(value, num) {
	var output = [];
	for(var i = 0; i < value.length; i++) {
		for(var j = 0; j < schools.length; j++) {
			if(value[i] == schools[j].name) {
				output.push(value[i]);
			}
		}
	}
	if(0 < output.length && output.length <= num) {
		return output;
	}
	else {
		return false;
	}
}

// Функция проверяет, существует ли заданное значение в массиве schools.
function findSchool(value, returnType) {
	let i;
	if(returnType) {
		for(i = 0; i < schools.length; i++) {
			if(value == schools[i].name) {
				return schools[i];
			}
		}
		return false;
	}
	else {
		for(i = 0; i < schools.length; i++) {
			if(value == schools[i].name) {
				return true;
			}
		}
		return false;
	}
}

// Функция проверяет, существует ли заданное значение в массиве auditoriums.
function findAuditorium(value, returnType) {
	let i;
	if(returnType) {
		for(i = 0; i < auditoriums.length; i++) {
			if(value == auditoriums[i].name) {
				return auditoriums[i];
			}
		}
		return false;
	}
	else {
		for(i = 0; i < auditoriums.length; i++) {
			if(value == auditoriums[i].name) {
				return true;
			}
		}
		return false;
	}
}

// Что? Многие find функции можно было упаковать в одну? – Ну конечно! Только я до этого додумался слишком поздно, отрефакторим.

// Вот она!
function find(value, array, returnType) {
	let i;
	if(returnType) {
		for(i = 0; i < array.length; i++) {
			if(value == array[i].name) {
				return array[i];
			}
		}
		return false;
	}
	else {
		for(i = 0; i < array.length; i++) {
			if(value == array[i].name) {
				return true;
			}
		}
		return false;
	}
}

// Функция проверяет, вместятся ли студенты заданных школ (s_value) в заданную аудиторию (a_value).
function exceedsCapacity(s_value, a_value) {
	let s_temp = 0;
	let a_temp = 0;
	let i, j;

	for(i = 0; i < s_value.length; i++) {
		for(j = 0; j < schools.length; j++) {
			if(s_value[i] == schools[j].name) {
				s_temp = s_temp + schools[j].students;
			}
		}
	}
	for(i = 0; i < auditoriums.length; i++) {
		if(a_value == auditoriums[i].name) {
			a_temp = auditoriums[i].capacity;
		}
	}

	if(s_temp <= a_temp) {
		return true;
	}
	else {
		return false;
	}
}

// Функция проверяет, могут ли существовать 2 объекта в заданный промежуток времени.
function checkTime(lecture, schools, start, end) {
}

// В принципе, все это можно было реализовать через геттеры и сеттеры, но я решил сделать "немного нагляднее". :)
// Касаемо комментирования всего кода. Я лишь прокомментирую работу одного класса, остальные же останутся без комментариев (если они там не потребуются), потому что все они на одно лицо.
class Teacher {
	constructor(name) {
		this.name = name;
	}
	// Метод добавления нового объекта Teacher в хранилище.
	add(name) {
		console.log('Teacher.add(' + name + ')');
		if(findTeacher(name)) {
			// Если данный объект Teacher существует, то выводим соответствующее сообщение.
			console.info('Teacher ' + name + ' is already exists');
		}
		else {
			// Если нет такого объекта, добавляем в конец массива новый объект Teacher.
			teachers.push({"name": name});
			console.info('Teacher ' + name + ' added');
		}
		//syncEngine.add('teachers', name);
	}
	// Метод изменения объекта Teacher.
	edit(name, value) {
		console.log('Teacher.edit(' + name + ', ' + value + ')');
		if(findTeacher(name)) {
			if(findTeacher(value)) {
				console.info('Teacher ' + value + ' is already exists');
			}
			else {
				let teacher = findTeacher(name, 1);
				teacher.name = value;
				console.info('Teacher ' + name + ' edited to ' + value);
			}
		}
		else {
			console.info('Teacher ' + name + ' is not exists');
		}
		//syncEngine.edit('teachers', name);
	}
	// Метод удаления объекта Teacher из хранилища.
	del(name) {
		console.log('Teacher.delete(' + name + ')');
		for(let i = 0; i < teachers.length; i++) {
			if(name == teachers[i].name) {
				// Если существует такой объект, то удаляем его.
				delete teachers[i];
				// После delete teachers[i] в массиве teachers появляется значение undefined.
				console.info('Teacher ' + name + ' deleted');
				break;
			}
		}
		// Фильтруем массив минуя значения undefined (которые появляются после delete teachers[i]).
		teachers = teachers.filter(function(a) { return a !== undefined; });
		//syncEngine.del('teachers', name);
	}
}

class Lecture {
	constructor(name, teacher, auditorium, input_schools) {
		this.name = name;
		this.teacher = teacher;
		this.auditorium = auditorium;
		this.input_schools = input_schools;
	}
	add(name, teacher, auditorium, input_schools) {
		console.log('Lecture.add(' + name + ', ' + teacher + ', ' + auditorium + ', ' + input_schools + ')');

		// Разбираем строку школ на элементы массива.
		input_schools = input_schools.split(', ');

		// Ищем лекцию по названию, если существует, выводим соответствующее сообщение.
		if(findLecture(name)) {
			console.info('Lecture ' + name + ' is already exists');
		}
		else {
			// Иначе начинаем работать со школами для новой лекции и проверяем, есть ли валидные школы и не больше их 2.
			if(findSchools(input_schools, 2)) {
				// Тут мы проверяем, вместится ли в заданной аудитории количество студентов заданных школ (заданной школы).
				if(exceedsCapacity(findSchools(input_schools, 2), auditorium)) {
					// Если все в порядке, вносим новую лекцию в хранилище.
					lectures.push({"name": name, "teacher": teacher, "auditorium": auditorium, "schools": findSchools(input_schools, 2)});
				}
				else {
					// Если количество студентов школ превышает вместимость аудитории, выводим соответствующее сообщение.
					console.error('Auditorium ' + auditorium + ' needs more capacity');
				}
			}
			else {
				// Если не существует заданных школ или их количество превышает 2, выводим соответствующее сообщение.
				console.error('Schools ' + input_schools + ' is not exists');
			}
		}
		//syncEngine.add('lectures', value);
	}
	edit(name, arg, value) {
		console.log('Lecture.edit(' + name + ', ' + arg + ', ' + value + ')');
		if(findLecture(name)) {
			let lecture = findLecture(name, 1);
			/* Знаю, что конструкция немного громоздкая и можно было бы, например, реализовать через
			if(arg == 'name ' || arg == 'teacher') : lecture[arg] = value ? return false;
			Возможно, я отрефакторю код до того момента, когда вы на него взглянете. */
			if(arg == 'name') {
				if(findLecture(value)) {
					console.info('Lecture ' + value + ' is already exists');
				}
				else {
					lecture.name = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else if(arg == 'teacher') {
				if(lecture.teacher == value) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
				}
				else {
					lecture.teacher = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else if(arg == 'auditorium') {
				if(lecture.auditorium == value) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
				}
				else {
					lecture.auditorium = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else if(arg == 'schools') {
				if(lecture.schools == value) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
				}
				else {
					lecture.schools = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else {
				console.error('Lecture ' + name + 'doesn\'t have an argument ' + arg);
			}
		}
		//syncEngine.edit('lectures', name);
	}
	del(name) {
		console.log('Lecture.delete(' + name + ')');
		for(let i = 0; i < lectures.length; i++) {
			if(name == lectures[i].name) {
				delete lectures[i];
				console.info('Lecture ' + name + ' deleted');
				break;
			}
		}
		lectures = lectures.filter(function(a) { return a !== undefined; });
		//syncEngine.del('lectures', name);
	}
}

class School {
	constructor(name, students) {
		this.name = name;
		this.students = students;
	}
	add(name, students) {
		console.log('School.add(' + name + ', ' + students + ')');
		if(findSchool(name)) {
			console.info('School ' + name + ' is already exists');
		}
		else {
			schools.push({"name": name, "students": students});
			console.info('School ' + name + ' added, quantity of students: ' + students);
		}
		//syncEngine.add('school', name);
	}
	edit(name, arg, value) {
		console.log('School.edit(' + name + ', ' + arg + ', ' + value + ')');
		if(findSchool(name)) {
			let school = findSchool(name, 1);
			if(arg == 'name') {
				if(findSchool(value)) {
					console.info('School ' + value + ' is already exists');
				}
				else {
					school.name = value;
					console.info('School ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else if(arg == 'students') {
				if(school.students == value) {
					console.info('School ' + name + ' in arg ' + arg + ' have ' + value);
				}
				else {
					school.students = value;
					console.info('School ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else {
				console.error('School ' + name + 'doesn\'t have an argument ' + arg);
			}
		}
		//syncEngine.edit('school', name);
	}
	del(name) {
		console.log('School.del(' + name + ')');
		for(let i = 0; i < schools.length; i++) {
			if(name == schools[i].name) {
				delete schools[i];
				console.info('School ' + name + ' deleted');
				break;
			}
			schools = schools.filter(function(a) { return a !== undefined; });
		}
		//syncEngine.del('school', name);
	}
}

class Auditorium {
	constructor(name, capacity, location) {
		this.name = name;
		this.capacity = capacity;
		this.location = location;
	}
	add(name, capacity, location) {
		console.log('Auditorium.add(' + name + ', ' + capacity + ', ' + location + ')');
		if(findAuditorium(name)) {
			console.info('Auditorium ' + name + ' is already exists');
		}
		else {
			auditoriums.push({"name": name, "capacity": capacity, "location": location});
			console.info('Auditorium ' + name + ' added, capacity: ' + capacity);
		}
		//syncEngine.add('auditoriums', name);
	}
	edit(name, arg, value) {
		console.log('Auditorium.edit(' + name + ', ' + arg + ', ' + value + ')');
		if(findAuditorium(name)) {
			let auditorium = findAuditorium(name, 1);
			if(arg == 'name') {
				if(findAuditorium(value)) {
					console.info('Auditorium ' + value + ' is already exists');
				}
				else {
					auditorium.name = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else if(arg == 'capacity') {
				if(auditorium.capacity == value) {
					console.info('Auditorium ' + name + ' in arg ' + arg + ' have ' + value);
				}
				else {
					auditorium.capacity = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else if(arg == 'location') {
				if(auditorium.location == value) {
					console.info('Auditorium ' + name + ' in arg ' + arg + ' have ' + value);
				}
				else {
					auditorium.location = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
				}
			}
			else {
				console.error('Auditorium ' + name + 'doesn\'t have an argument ' + arg);
			}
		}
		//syncEngine.edit('auditoriums', name);
	}
	del(name) {
		console.log('Auditorium.del(' + name + ')');
		for(let i = 0; i < auditoriums.length; i++) {
			if(name == auditoriums[i].name) {
				delete auditoriums[i];
				console.info('Auditorium ' + name + ' deleted');
				break;
			}
		}
		auditoriums = auditoriums.filter(function(a) { return a !== undefined; });
		//syncEngine.del('auditoriums', name);
	}
}

var syncEngine = new sync();

//var lecture = new Lecture();
//var teacher = new Teacher();
//var school = new School();
//var auditor = new Auditorium();

function TestAPI(entryPoint) {
	if(entryPoint == "Teacher") {
		let teacher = new Teacher();

		teacher.add('Терентьев');
		teacher.add('Ожогов');
		teacher.edit('Ожогов', 'Трофимов');
		teacher.edit('Ожогов', 'Свободная');
		teacher.del('Терентьев');
	}
	else if(entryPoint == "Lecture") {
		let lecture = new Lecture();

		lecture.add('Параллельные вычисления', 'Яковлев', 'Мобилизация', 'Школа мобильной разработки');
		lecture.add('Управление подразделениями', 'Свободная', 'Маркет', 'Школа менеджмента');
		lecture.edit('Управление подразделениями', 'name', 'Управление персоналом');
		lecture.del('Параллельные вычисления');
	}
	else if(entryPoint == "School") {
		let school = new School();

		school.add('Школа обработки данных', 100);
		school.add('Школа обработки информации', 25);
		school.edit('Школа обработки данных', 'name', 'APEX');
		school.del('Школа обработки информации');
	}
	else if(entryPoint == "Auditorium") {
		let auditorium = new Auditorium();

		auditorium.add('Точка входа', 100, 'Google HQ');
		auditorium.add('V8', 50, 'Google HQ');
		auditorium.edit('V8', 'name', 'Мобилизация');
		auditorium.edit('V8', 'capacity', 100);
		auditorium.edit('V8', 'location', 'Yandex');
		auditorium.del('Точка входа');
	}
	else {
		console.error('TestAPI: Invalid entryPoint value');
	}
}

//TestAPI('Teacher');
//TestAPI('Lecture');
//TestAPI('School');
//TestAPI('Auditorium');

