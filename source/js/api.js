/* jshint esversion: 6 */

/*
 * ВСТУПЛЕНИЕ.
 */

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
		// "name": "Параллельные и распределенные вычисления",
		"name": "один",
		"teacher": "Яковлев",
		"auditorium": "Синий Кит",
		"time": {
			"start": new Date(2017, 3, 1, 12, 0, 0),
			"end": new Date(2017, 3, 1, 13, 30, 0)
		},
		"schools": ["Школа разработки интерфейсов", "Школа дизайна"]
	},
	{
		// "name": "Взаимодействие с сообществом",
		"name": "два",
		"teacher": "Цыплухин",
		"auditorium": "Маркет",
		"time": {
			"start": new Date(2017, 3, 1, 12, 0, 0),
			"end": new Date(2017, 3, 1, 13, 0, 0)
		},
		// "schools": ["Школа менеджмента", "Школа мобильного дизайна"]
		"schools": ["Школа менеджмента"]
	},
	{
		// "name": "Взаимодействие с сообществом",
		"name": "три",
		"teacher": "Трофимов",
		"auditorium": "Синий Кит",
		"time": {
			"start": new Date(2017, 3, 1, 13, 0, 0),
			"end": new Date(2017, 3, 1, 14, 0, 0)
		},
		// "schools": ["Школа менеджмента", "Школа мобильного дизайна"]
		"schools": ["Школа мобильного дизайна"]
	}
];

var auditoriums = [
	{
		"name": "Синий Кит",
		"capacity": 100,
		"location": "Яндекс"
	},
	{
		"name": "Вертикаль",
		"capacity": 75,
		"location": "Яндекс"
	},
	{
		"name": "Мобилизация",
		"capacity": 200,
		"location": "Яндекс"
	},
	{
		"name": "Маркет",
		"capacity": 125,
		"location": "Яндекс"
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

/*
 * Функция проверяет, поддерживает ли браузер LocalStorage API.
 * @returns {boolean}
 */
function isLocalStorageAvailable() {
	try {
		let storage = window.localStorage, x = 'Test';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

/*
 * Функция производит поиск заданного значения value по заданному массиву array. При наличии третьего аргумента (returnType) функция возвращает найденный объект, иначе true/false (найдено/не найдено).
 * @param {string} value
 * @param {Array} array
 * @param {boolean} returnType
 * @returns {Object|boolean}
 */
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

/*
 * Функция проверяет, существуют ли заданные школы (value), а также учитывает количество школ для лекции (num).
 * @param {Array} value
 * @param {number} num
 * @returns {Array|boolean}
 */
function findSchools(value, num) {
	let i, j, output = [];

	for(i = 0; i < value.length; i++) {
		for(j = 0; j < schools.length; j++) {
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

/*
 * Функция проверяет, вместятся ли студенты заданных школ s_value (массив) в заданную аудиторию a_value.
 * @param {Array} s_value
 * @param {string} a_value
 * @returns {boolean}
 */
function exceedsCapacity(s_value, a_value) {
	let s_temp = 0, a_temp = 0, i, j;

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
		return false;
	}
	else {
		return true;
	}
}

/*
 * Функция парсит входящую строку данных на 2 объекта с датой и возвращает их (объекты).
 * P.S. Пожалуйста, не стоит оценивать качество данной функции (и ломать ее, это ведь проще некуда). Вероятно, я успею ее переработать до того момента, когда вы на нее взглянете, но, как вы видите сейчас, она может обрабатывать только строго заданное значение DD.MM.YY(YY) HH:MM-HH:MM.
 * @param {string} value
 * @returns {Object.<Object, Object>}
 */
function inputTime(value) {
	let date, time, time_start, time_end, start, end;

	value = value.split(' ');
	date = value[0];
	time = value[1];

	date = date.split('.');
	time = time.split('-');
	time_start = time[0].split(':');
	time_end = time[1].split(':');

	start = new Date(date[2], date[1]-1, date[0], time_start[0], time_start[1], 0);
	end = new Date(date[2], date[1]-1, date[0], time_end[0], time_end[1], 0);

	if((end - start) === 0) {
		return false;
	}
	else if((end - start) > 0) {
		return {"start": start, "end": end};
	}
	else {
		return {"start": end, "end": start};
	}
}

function inputdTime(value) {
	let date, time, output;

	value = value.split(' ');
	date = value[0];
	time = value[1];

	date = date.split('.');
	time = time.split(':');

	output = new Date(date[2], date[1]-1, date[0], time[0], time[1], 0);

	return output;
}

/*
 * Функция проверяет, пересекаются ли временные промежутки 2 заданных объектов (l1.time, l2.time) между собой.
 * @param {Object} t1
 * @param {Object} t2
 * @returns {boolean}
 */
function compareTime(t1, t2) {
	if((t1.start <= t2.start && t2.start <= t1.end) || (t2.start <= t1.end && t1.end <= t2.end)) {
		return true;
	}
	return false;
}

/*
 * Функция проверяет, пересекаются ли 2 заданных объекта (l1.schools, l2.schools | школы) между собой.
 * @param {Object} s1
 * @param {Object} s2
 * @returns {boolean}
 */
function compareSchools(s1, s2) {
	let i, j;

	for(i = 0; i < s1.length; i++) {
		for(j = 0; j < s2.length; j++) {
			if(s1[i] == s2[j]) {
				return true;
			}
		}
	}
	return false;
}

/*
 * Функция сравнивает объект lecture со всеми существующими объектами lecture.
 * @param {Object} lecture
 * @returns {boolean}
 */
function compareLectures(lecture) {
	let i;

	for(i = 0; i < lectures.length; i++) {
		if(lecture.name == lectures[i].name) {
			return true;
		}
		else {
			if(compareTime(lecture.time, lectures[i].time)) {
				if(lecture.teacher == lectures[i].teacher) {
					return true;
				}
				else if(lecture.auditorium == lectures[i].auditorium) {
					return true;
				}
				else if(compareSchools(lecture.schools, lectures[i].schools)) {
					return true;
				}
			}
		}
	}
	return false;
}

// Касаемо комментирования всего кода. Я лишь прокомментирую работу одного класса, остальные же останутся без комментариев (если они там не потребуются), потому что все они на одно лицо.

// Класс, отвечающий за учителей. :)
class Teacher {
	constructor(name) {
		this.name = name;
	}
	/*
	 * Метод добавления нового объекта Teacher.
	 * @param {string} name
	 * @returns {boolean}
	 */
	add(name) {
		console.log('Teacher.add(' + name + ')');
		// Проверяем, существует ли такой объект.
		if(find(name, teachers)) {
			// Если такой объект существует, то выводим соответствующее сообщение.
			console.error('Teacher ' + name + ' is already exists');
			return false;
		}
		else {
			// Если такой объект не существует, добавляем его.
			teachers.push({"name": name});
			console.info('Teacher ' + name + ' added');
			return true;
		}
		//syncEngine.add('teachers', name);
	}
	/*
	 * Метод изменения объекта Teacher.
	 * @param {string} name
	 * @param {string} value
	 * @returns {boolean}
	 */
	edit(name, value) {
		console.log('Teacher.edit(' + name + ', ' + value + ')');
		// Проверка, существует ли такой учитель.
		if(find(name, teachers)) {
			// Проверка, существует ли такой учитель по значению value.
			if(find(value, teachers)) {
				console.error('Teacher ' + value + ' is already exists');
				return false;
			}
			else {
				// Если заданное значение не пересекается с существующими объектами Teacher, то берем заданный объект на вооружение и изменяем его значение.
				let teacher = find(name, teachers, true);
				teacher.name = value;
				console.info('Teacher ' + name + ' edited to ' + value);
				return true;
			}
		}
		else {
			// Если подобного объекта Teacher не существует, выводим соответствующее сообщение.
			console.error('Teacher ' + name + ' is not exists');
			return false;
		}
		//syncEngine.edit('teachers', name);
	}
	/*
	 * Метод удаления объекта Teacher.
	 * @param {string} name
	 * @returns {boolean}
	 */
	del(name) {
		console.log('Teacher.delete(' + name + ')');
		if(find(name, teachers)) {
			// Перебираем массив teachers
			for(let i = 0; i < teachers.length; i++) {
				// Проверяем, совпадает ли заданное значение со значениями объектов Teacher.
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
			return true;
		}
		return false;
		//syncEngine.del('teachers', name);
	}
	/*
	 * Метод, возвращающий объект Teacher по заданному значению (если таковой имеется).
	 * @param {string} name
	 * @returns {Object|boolean}
	 */
	get(name) {
		console.log('Teacher.get(' + name + ')');
		if(find(name, teachers)) {
			console.log(find(name, teachers, true));
			return find(name, teachers, true);
		}
		else {
			console.error('Teacher ' + name + ' is not exists');
			return false;
		}
	}
	/*
	 * Метод, который возвращает все существующие объекты Teacher.
	 * @returns {Array.Object}
	 */
	getAll() {
		console.log('Teacher.getAll()');
		console.log(teachers);
		return teachers;
	}
}

// Класс, отвечающий за лекции.
class Lecture {
	constructor(name, teacher, auditorium, time, input_schools) {
		this.name = name;
		this.teacher = teacher;
		this.auditorium = auditorium;
		this.time = time;
		this.input_schools = input_schools;
	}
	/*
	 * @param {string} name
	 * @param {string} teacher
	 * @param {string} auditorium
	 * @param {string} time
	 * @param {string} input_schools
	 * @returns {boolean}
	 */
	add(name, teacher, auditorium, time, input_schools) {
		console.log('Lecture.add(' + name + ', ' + teacher + ', ' + auditorium + ', ' + time + ', ' + input_schools + ')');

		// Разбираем строку школ на элементы массива.
		input_schools = input_schools.split(', ');

		// Ищем лекцию по названию, если существует, выводим соответствующее сообщение.
		if(find(name, lectures)) {
			console.error('Lecture ' + name + ' is already exists');
			return false;
		}
		else {
			let lecture = {"name": name, "teacher": teacher, "auditorium": auditorium, "time": inputTime(time), "schools": findSchools(input_schools, 2)};

			if(findSchools(input_schools, 2)) {
				if(!exceedsCapacity(findSchools(input_schools, 2), auditorium)) {
					if(!compareLectures(lecture)) {
						lectures.push(lecture);
						return true;
					}
					else {
						console.error('ERROR.');
						return false;
					}
				}
				else {
					console.log('Exceeds capacity in auditorium ' + auditorium);
					return false;
				}
			}
			return false;
		}
		//syncEngine.add('lectures', value);
	}
	/*
	 * @param {string} name
	 * @param {string} arg
	 * @param {string} value
	 * @returns {boolean}
	 */
	edit(name, arg, value) {
		console.log('Lecture.edit(' + name + ', ' + arg + ', ' + value + ')');
		if(find(name, lectures)) {
			let lecture = find(name, lectures, true);
			/* Знаю, что конструкция немного громоздкая и можно было бы, например, реализовать через if(arg == 'name' || arg == 'teacher' || ...) : lecture[arg] = value ? return false;
			Хотя, вероятно, подобное решение не сможет должным образом обрабатывать поступающие данные (это всего-лишь домыслы).
			Возможно, я отрефакторю код до того момента, когда вы на него взглянете. */
			if(arg == 'name') {
				if(find(value, lectures)) {
					console.info('Lecture ' + value + ' is already exists');
					return false;
				}
				else {
					lecture.name = value;
					console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
					return true;
				}
			}
			else if(arg == 'teacher') {
				if(lecture.teacher == value) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					if(!compareLectures(lecture)) {
						lecture.teacher = value;
						console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
						return true;
					}
				}
			}
			else if(arg == 'auditorium') {
				if(lecture.auditorium == value) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					if(!exceedsCapacity(lecture.schools, 2)) {
						if(!compareLectures(lecture)) {
							lecture.auditorium = value;
							console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
							return true;
						}
						return false;
					}
					return false;
				}
			}
			else if(arg == 'schools') {
				value = value.split(', ');
				// Почему .toString? - Чтобы сравнить два массива в текстовом виде, не перебирая их.
				if(lecture.schools.toString() == value.toString()) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					if(findSchools(value, 2)) {
						if(!compareLectures(lecture)) {
							lecture.schools = value;
							console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
							return true;
						}
						return false;
					}
					return false;
				}
			}
			else {
				console.error('Lecture ' + name + 'doesn\'t have an argument ' + arg);
				return false;
			}
		}
		//syncEngine.edit('lectures', name);
	}
	/*
	 * @param {string} name
	 * @returns {boolean}
	 */
	del(name) {
		console.log('Lecture.delete(' + name + ')');
		if(find(name, lectures)) {
			for(let i = 0; i < lectures.length; i++) {
				if(name == lectures[i].name) {
					delete lectures[i];
					console.info('Lecture ' + name + ' deleted');
					break;
				}
			}
			lectures = lectures.filter(function(a) { return a !== undefined; });
			return true;
		}
		return false;
		//syncEngine.del('lectures', name);
	}
	// За правильность названия нижеследующих методов не берусь. :)
	/*
	 * @param {string} name
	 * @param {string} start
	 * @param {string} end
	 * @param {string} arg
	 * @returns {Array|boolean}
	 */
	search(name, start, end, arg) {}
	/*
	 * @param {string} name
	 * @returns {Object|boolean}
	 */
	get(name) {
		console.log('Lecture.get(' + name + ')');
		if(find(name, lectures)) {
			console.log(find(name, lectures, true));
			return find(name, lectures, true);
		}
		else {
			console.error('Lecture ' + name + ' is not exists');
			return false;
		}
	}
	/*
	 * @returns {Array.Object}
	 */
	getAll() {
		console.log('Lecture.getAll()');
		console.log(lectures);
		return lectures;
	}
}

class School {
	constructor(name, students) {
		this.name = name;
		this.students = students;
	}
	/*
	 * @param {string} name
	 * @param {number} students
	 * @returns {boolean}
	 */
	add(name, students) {
		console.log('School.add(' + name + ', ' + students + ')');
		if(find(name, schools)) {
			console.info('School ' + name + ' is already exists');
			return false;
		}
		else {
			schools.push({"name": name, "students": students});
			console.info('School ' + name + ' added, quantity of students: ' + students);
			return true;
		}
		//syncEngine.add('school', name);
	}
	/*
	 * @param {string} name
	 * @param {string} arg
	 * @param {string} value
	 * @returns {boolean}
	 */
	edit(name, arg, value) {
		console.log('School.edit(' + name + ', ' + arg + ', ' + value + ')');
		if(find(name, schools)) {
			let school = find(name, schools, true);
			if(arg == 'name') {
				if(find(value, schools)) {
					console.info('School ' + value + ' is already exists');
					return false;
				}
				else {
					school.name = value;
					console.info('School ' + name + ' edited arg ' + arg + ': ' + value);
					return true;
				}
			}
			else if(arg == 'students') {
				if(school.students == value) {
					console.info('School ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					school.students = value;
					console.info('School ' + name + ' edited arg ' + arg + ': ' + value);
					return true;
				}
			}
			else {
				console.error('School ' + name + 'doesn\'t have an argument ' + arg);
				return false;
			}
		}
		//syncEngine.edit('school', name);
	}
	/*
	 * @param {string} name
	 * @returns {boolean}
	 */
	del(name) {
		console.log('School.del(' + name + ')');
		if(find(name, schools)) {
			for(let i = 0; i < schools.length; i++) {
				if(name == schools[i].name) {
					delete schools[i];
					console.info('School ' + name + ' deleted');
					break;
				}
			}
			schools = schools.filter(function(a) { return a !== undefined; });
			return true;
		}
		return false;
		//syncEngine.del('school', name);
	}
	/*
	 * @param {string} name
	 * @returns {Object|boolean}
	 */
	get(name) {
		console.log('School.get(' + name + ')');
		if(find(name, schools)) {
			console.log(find(name, schools, true));
			return find(name, schools, true);
		}
		else {
			console.error('School ' + name + ' is not exists');
			return false;
		}
	}
	/*
	 * @returns {Array.Object}
	 */
	getAll() {
		console.log('School.getAll()');
		console.log(schools);
		return schools;
	}
}

class Auditorium {
	constructor(name, capacity, location) {
		this.name = name;
		this.capacity = capacity;
		this.location = location;
	}
	/*
	 * @param {string} name
	 * @param {number} capacity
	 * @param {string} location
	 * @returns {boolean}
	 */
	add(name, capacity, location) {
		console.log('Auditorium.add(' + name + ', ' + capacity + ', ' + location + ')');
		if(find(name, auditoriums)) {
			console.info('Auditorium ' + name + ' is already exists');
			return false;
		}
		else {
			auditoriums.push({"name": name, "capacity": capacity, "location": location});
			console.info('Auditorium ' + name + ' added, capacity: ' + capacity);
			return true;
		}
		//syncEngine.add('auditoriums', name);
	}
	/*
	 * @param {string} name
	 * @param {string} arg
	 * @param {string} value
	 * @returns {boolean}
	 */
	edit(name, arg, value) {
		console.log('Auditorium.edit(' + name + ', ' + arg + ', ' + value + ')');
		if(find(name, auditoriums)) {
			let auditorium = find(name, auditoriums, true);
			if(arg == 'name') {
				if(find(value, auditoriums)) {
					console.info('Auditorium ' + value + ' is already exists');
					return false;
				}
				else {
					auditorium.name = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
					return true;
				}
			}
			else if(arg == 'capacity') {
				if(auditorium.capacity == value) {
					console.info('Auditorium ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					auditorium.capacity = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
					return true;
					// sync.updateData('auditoriums');
				}
			}
			else if(arg == 'location') {
				if(auditorium.location == value) {
					console.info('Auditorium ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					auditorium.location = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
					return true;
					// sync.updateData('auditoriums');
				}
			}
			else {
				console.error('Auditorium ' + name + 'doesn\'t have an argument ' + arg);
				return false;
			}
		}
		//syncEngine.edit('auditoriums', name);
	}
	/*
	 * @param {string} name
	 * @returns {boolean}
	 */
	del(name) {
		console.log('Auditorium.del(' + name + ')');
		if(find(name, auditoriums)) {
			for(let i = 0; i < auditoriums.length; i++) {
				if(name == auditoriums[i].name) {
					delete auditoriums[i];
					console.info('Auditorium ' + name + ' deleted');
					break;
				}
			}
			auditoriums = auditoriums.filter(function(a) { return a !== undefined; });
			return true;
		}
		return false;
		//syncEngine.del('auditoriums', name);
	}
	/*
	 * @param {string} name
	 * @returns {Object|boolean}
	 */
	get(name) {
		console.log('Auditorium.get(' + name + ')');
		if(find(name, auditoriums)) {
			console.log(find(name, auditoriums, true));
			return find(name, auditoriums, true);
		}
		else {
			console.error('Auditorium ' + name + ' is not exists');
			return false;
		}
	}
	/*
	 * @returns {Array.Object}
	 */
	getAll() {
		console.log('Auditorium.getAll()');
		console.log(auditoriums);
		return auditoriums;
	}
}

// Класс работы с LocalStorage API и синхронизация данных с backend'ом (в будущем).
class storageManager {
	constructor(type) {
		this.type = type;
	}
	getData(type) {
		if(isLocalStorageAvailable()) {
			if(type == 'teachers' || type == 'lectures' || type == 'schools' || type == 'auditoriums') {
				return JSON.parse(localStorage.getItem(type));
			}
			else {
				return false;
			}
		}
	}
	updateData(type) {
		if(isLocalStorageAvailable()) {
			if(type == 'teachers') {
				localStorage.setItem(type, JSON.stringify(teachers));
				syncEngine.sendData(type);
				return true;
			}
			else if(type == 'lectures') {
				localStorage.setItem(type, JSON.stringify(lectures));
				syncEngine.sendData(type);
				return true;
			}
			else if(type == 'schools') {
				localStorage.setItem(type, JSON.stringify(schools));
				syncEngine.sendData(type);
				return true;
			}
			else if(type == 'auditoriums') {
				localStorage.setItem(type, JSON.stringify(auditoriums));
				syncEngine.sendData(type);
				return true;
			}
			else {
				console.error('Type ' + type + ' is not supported by API');
				return false;
			}
		}
		else {
			//
		}
	}
	sendData(type, data) {}
}

var sync = new storageManager();

var teacher = new Teacher();
var lecture = new Lecture();
var school = new School();
var auditorium = new Auditorium();

// Примитивное тестирование библиотеки.
function TestAPI(entryPoint) {
	if(entryPoint == 'Teacher') {
		teacher.add('Терентьев');
		teacher.add('Ожогов');
		teacher.edit('Ожогов', 'Трофимов');
		teacher.edit('Ожогов', 'Свободная');
		teacher.del('Терентьев');
		teacher.get('Терентьев');
		teacher.get('Свободная');
	}
	else if(entryPoint == 'Lecture') {
		lecture.add('Параллельные вычисления', 'Яковлев', 'Мобилизация', '15.07.2017 16:30-17:30', 'Школа мобильной разработки');
		lecture.add('Управление подразделениями', 'Свободная', 'Маркет', '16.07.2017 18:00-20:00', 'Школа менеджмента');
		lecture.edit('Управление подразделениями', 'name', 'Управление персоналом');
		lecture.del('Параллельные вычисления');
		lecture.get('Параллельные вычисления');
		lecture.get('Управление персоналом');
	}
	else if(entryPoint == 'School') {
		school.add('Школа обработки данных', 100);
		school.add('Школа обработки информации', 25);
		school.edit('Школа обработки данных', 'name', 'APEX');
		school.del('Школа обработки информации');
		school.edit('APEX', 'name', 'APEX');
		school.edit('APEX', 'students', 50);
		school.get('Школа разработки интерфейсов');
	}
	else if(entryPoint == 'Auditorium') {
		auditorium.add('Точка входа', 100, 'Google HQ');
		auditorium.add('V8', 50, 'Google HQ');
		auditorium.edit('V8', 'name', 'Мобилизация');
		auditorium.edit('V8', 'capacity', 100);
		auditorium.edit('V8', 'location', 'Яндекс');
		auditorium.del('Точка входа');
		auditorium.get('Вертикаль');
		auditorium.get('Точка входа');
	}
	else {
		console.error('TestAPI: Invalid entryPoint value');
	}
}

//TestAPI('Teacher');
//TestAPI('Lecture');
//TestAPI('School');
//TestAPI('Auditorium');

