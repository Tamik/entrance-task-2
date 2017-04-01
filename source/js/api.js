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

// function errorHandler(_class, _obj, _code) {
// 	switch(_class) {
// 		case 0: _class = '0'; break;
// 		case 1: _class = '1'; break;
// 		case 2: _class = '2'; break;
// 		case 3: _class = '3'; break;
// 	}
// 	switch(_code) {
// 		case 0: return _class + ': Object is already exists';
// 		case 1: return _class + ': Object is added';
// 		case 2: return _class + ': Object is edited';
// 		case 3: return _class + ': Object is deleted';
// 		case 4: return _class + ': Object does not exists';
// 		case 5: return _class + ': ';
// 		default: return _class + ': ';
// 	}
// }

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
		ls = 'localStorage';
		var storage = window[ls], x = "Test";
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

function findSchool(value, num) {
	var output = [];
	if(0 < value.length && value.length <= num) {
		for(var i = 0; i < value.length; i++) {
			for(var j = 0; j < schools.length; j++) {
				if(value[i] == schools[j].name) {
					output.push(value[i]);
				}
			}
		}
		return output;
	}
	else {
		return false;
	}
}

function exceedsCapacity(s_value, a_value, num) {
	var s_temp = 0;
	var a_temp = 0;
	if(0 < s_value.length && s_value.length <= num) {
		for(var i = 0; i < s_value.length; i++) {
			for(var j = 0; j < schools.length; j++) {
				if(s_value[i] == schools[j].name) {
					//s_temp.push(schools[j].students);
					s_temp = s_temp + schools[j].students;
				}
			}
		}
		for(var i = 0; i < auditoriums.length; i++) {
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
		// Перебираем массив teachers и ищем подходящее значение.
		for(var i = 0; i < teachers.length; i++) {
			if(name == teachers[i].name) {
				// Если данный объект Teacher существует, то выводим соответствующее сообщение.
				console.info('Teacher ' + name + ' is already exists');
				break;
			}
			else {
				// Если нет такого объекта, добавляем в конец массива новый объект Teacher.
				teachers.push({"name": name});
				console.info('Teacher ' + name + ' added');
				break;
			}
		}
		//syncEngine.add('teachers', name);
	}
	// Метод изменения объекта Teacher.
	edit(name, value) {
		console.log('Teacher.edit(' + name + ', ' + value + ')');
		for(var i = 0; i < teachers.length; i++) {
			if(name == teachers[i].name) {
				teachers[i].name = value;
				console.info('Teacher ' + name + ' edited to ' + value);
				break;
			}
		}
		//syncEngine.edit('teachers', name);
	}
	// Метод удаления объекта Teacher из хранилища.
	del(name) {
		console.log('Teacher.delete(' + name + ')');
		for(var i = 0; i < teachers.length; i++) {
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

		for(var i = 0; i < teachers.length; i++) {
			if(name == lectures[i].name) {
				console.info('Lecture ' + name + ' is already exists');
				break;
			}
			// else {
			// 	if(1 <= input_schools.length && input_schools.length <= 2) {
			// 		//
			// 		for(var j = 0; j < input_schools.length; j++) {
			// 			for(var k = 0; k < schools.length; k++) {
			// 				if(input_schools[j] == schools[k].name) {
			// 					// ALILUYA
			// 					break;
			// 				}
			// 				else {
			// 					console.error('Inputted school ' + input_school[i] + ' is not exists');
			// 					break;
			// 				}
			// 			}
			// 		}
			// 		//
			// 		for(var j = 0; j < auditoriums.length; j++) {
			// 			if(auditorium == auditoriums[j].name) {
			// 				console.log('OK!');
			// 				if(input_schools[0] == schools[j].name) {
			// 					// ok
			// 					console.info('suspect');
			// 					break;
			// 				}
			// 				else {
			// 					console.error('School ' + input_schools[i] + ' is not exists');
			// 					break;
			// 				}
			// 			}
			// 			else {
			// 				console.error('Auditorium ' + auditorium + ' is not exists');
			// 				break;
			// 			}
			// 		}
			// 	}
			// 	else {
			// 		console.error('Lecture ' + name + ' can\'t have more 2 schools');
			// 		break;
			// 	}
			// }
		}
		//syncEngine.add('lectures', value);
	}
	edit(name, arg, value) {
		console.log('Lecture.edit(' + name + ', ' + arg + ', ' + value + ')');
		for(var i = 0; i < lectures.length; i++) {
			if(name == lectures[i].name) {
				if(arg == 'name') {
					lectures[i].name = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else if(arg == 'teacher') {
					lectures[i].teacher = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else if(arg == 'auditorium') {
					lectures[i].auditorium = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else if(arg == 'schools') {
					lectures[i].schools = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else {
					// ...
					console.error('Lecture ' + name + 'doesn\'t have an argument ' + arg);
					break;
				}
			}
		}
		//syncEngine.edit('lectures', name);
	}
	del(name) {
		console.log('Lecture.delete(' + name + ')');
		for(var i = 0; i < lectures.length; i++) {
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
		for(var i = 0; i < schools.length; i++) {
			if(name == schools[i].name) {
				console.info('School ' + name + ' is already exists');
				break;
			}
			else {
				schools.push({"name": name, "students": students});
				console.info('School ' + name + ' added, quantity of students: ' + students);
				break;
			}
		}
		//syncEngine.add('school', name);
	}
	edit(name, arg, value) {
		for(var i = 0; i < schools.length; i++) {
			if(name == schools[i].name) {
				if(arg == 'students') {
					schools[i].students = value;
					console.info('School ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else if(arg == 'name') {
					schools[i].name = value;
					console.info('School ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else {
					console.error('School ' + name + 'doesn\'t have an argument ' + arg);
				}
			}
		}
		//syncEngine.edit('school', name);
	}
	del(name) {
		for(var i = 0; i < schools.length; i++) {
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
		for(var i = 0; i < auditoriums.length; i++) {
			if(name == auditoriums[i].name) {
				console.info('Auditorium ' + name + ' is already exists');
				break;
			}
			else {
				auditoriums.push({"name": name, "capacity": capacity, "location": location});
				console.info('Auditorium ' + name + ' added, capacity: ' + capacity);
				break;
			}
		}
		//syncEngine.add('auditoriums', name);
	}
	edit(name, arg, value) {
		for(var i = 0; i < auditoriums.length; i++) {
			if(name == auditoriums[i].name) {
				if(arg == 'name') {
					auditoriums[i].name = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else if(arg == 'capacity') {
					auditoriums[i].capacity = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else if(arg == 'location') {
					auditoriums[i].location = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
					break;
				}
				else {
					console.error('Auditorium ' + name + 'doesn\'t have an argument ' + arg);
					break;
				}
			}
		}
		//syncEngine.edit('auditoriums', name);
	}
	del(name) {
		for(var i = 0; i < auditoriums.length; i++) {
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

//lecture.add();

var lecture = new Lecture();

function TestAPI(entryPoint) {
	if(entryPoint == "Teacher") {
		let user = new Teacher();

		user.add('Терентьев');
		user.add('Ожогов');
		user.edit('Ожогов', 'Свободная');
		user.del('Терентьев');
	}
	else if(entryPoint == "Lecture") {
		//let lecture = new Lecture();
	}
	else if(entryPoint == "School") {
		let school = new School();

		school.add('Trololo', 100);
		school.add('Epic', 25);
		school.edit('Trololo', 'name', 'Apex');
		school.del('Epic');
	}
	else if(entryPoint == "Auditorium") {
		let auditorium = new Auditorium();

		auditorium.add('EntryPoint', 100, 'Google HQ');
		auditorium.add('JS', 50, 'Google HQ');
		auditorium.edit('JS', 'name', 'Stonebank');
		auditorium.del('EntryPoint');
	}
	else {
		console.error('TestAPI: Invalid entryPoint value');
	}
}

//TestAPI('Teacher');
//TestAPI('Lecture');
//TestAPI('School');
//TestAPI('Auditorium');

