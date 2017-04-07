/* jshint esversion: 6 */

/*
 * ВСТУПЛЕНИЕ.
 * ...
 */

// Данные переменные являются значениями по умолчанию для демонстрации работы API.
var TEACHERS = [
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

var LECTURES = [
	{
		"name": "Параллельные и распределенные вычисления",
		"teacher": "Яковлев",
		"auditorium": "Синий Кит",
		"time": {
			"start": new Date(2017, 3, 1, 12, 0, 0),
			"end": new Date(2017, 3, 1, 13, 30, 0)
		},
		"schools": ["Школа разработки интерфейсов", "Школа мобильной разработки"]
	},
	{
		"name": "Организация мероприятий",
		"teacher": "Цыплухин",
		"auditorium": "Маркет",
		"time": {
			"start": new Date(2017, 3, 1, 12, 0, 0),
			"end": new Date(2017, 3, 1, 13, 0, 0)
		},
		"schools": ["Школа менеджмента"]
	},
	{
		"name": "MVP&Co",
		"teacher": "Трофимов",
		"auditorium": "Синий Кит",
		"time": {
			"start": new Date(2017, 3, 1, 14, 0, 0),
			"end": new Date(2017, 3, 1, 15, 0, 0)
		},
		"schools": ["Школа мобильной разработки", "Школа мобильного дизайна"]
	}
];

var SCHOOLS = [
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

var AUDITORIUMS = [
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
			if(value.toLowerCase() == array[i].name.toLowerCase()) {
				return array[i];
			}
		}
		return false;
	}
	else {
		for(i = 0; i < array.length; i++) {
			if(value.toLowerCase() == array[i].name.toLowerCase()) {
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
			if(value[i].toLowerCase() == schools[j].name.toLowerCase()) {
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
			if(s_value[i].toLowerCase() == schools[j].name.toLowerCase()) {
				s_temp = s_temp + schools[j].students;
			}
		}
	}
	for(i = 0; i < auditoriums.length; i++) {
		if(a_value.toLowerCase() == auditoriums[i].name.toLowerCase()) {
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
 * Функция парсит входящую строку данных на объект с датой и возвращает их (как объект).
 * P.S. Пожалуйста, не стоит оценивать качество данной функции (и ломать ее, это ведь проще некуда). Вероятно, я успею ее переработать до того момента, когда вы на нее взглянете, но, как вы видите сейчас, она может обрабатывать только строго заданное значение.
 * @param {string} value "DD.MM.YY(YY) HH:MM, DD.MM.YY(YY) HH:MM"
 * @returns {Object.<Object, Object>|boolean}
 */
function inputTime(value) {
	let start, end, date_start, date_end;

	value = value.split(', ');

	date_start = value[0].split(' ');
	date_end = value[1].split(' ');

	date_start[0] = date_start[0].replace(/(\d+)\.(\d+)\.(\d+)/, '$2.$1.$3');
	date_end[0] = date_end[0].replace(/(\d+)\.(\d+)\.(\d+)/, '$2.$1.$3');

	start = date_start[0] + ' ' + date_start[1];
	end = date_end[0] + ' ' + date_end[1];

	start = new Date(start);
	end = new Date(end);

	if((end - start) > 0) {
		return {"start": start, "end": end};
	}
	else if((end - start) < 0) {
		return {"start": end, "end": start};
	}
	else {
		return false;
	}
}

/*
 * Функция проверяет, пересекаются ли временные промежутки 2 заданных объектов (l1.time, l2.time) между собой.
 * @param {Object} t1
 * @param {Object} t2
 * @returns {boolean}
 */
function compareTime(t1, t2) {
	// Столкнулся с такой особенностью, что если данные дергаются не из константных переменных (TEACHERS, LECTURES, и пр.), а из Local Storage (в данном случае (по факту косяк в JSON.stringify() и JSON.parse())), то время является не объектом Date, а строкой. Соответственно, сравнить их корректно не получится. В итоге был написан такой небольшой кусок кода, который решает данную проблему, пересоздавая объект из строки.
	if(typeof t1.start == 'string') {
		t1.start = new Date(t1.start);
	}
	else if(typeof t1.end == 'string') {
		t1.end = new Date(t1.end);
	}
	else if(typeof t2.start == 'string') {
		t2.start = new Date(t2.start);
	}
	else if(typeof t2.end == 'string') {
		t2.end = new Date(t2.end);
	}
	if((t1.start <= t2.start && t2.start <= t1.end) || (t2.start <= t1.end && t1.end <= t2.end) || (t2.start <= t1.start && t1.start <= t2.end) || (t1.start <= t2.end && t2.end <= t1.end)) {
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
			if(s1[i].toLowerCase() == s2[j].toLowerCase()) {
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
	let i, id;

	for(i = 0; i < lectures.length; i++) {
		if(lecture.name.toLowerCase() == lectures[i].name.toLowerCase()) {
			// return true;
		}
		else {
			if(compareTime(lecture.time, lectures[i].time)) {
				if(lecture.teacher.toLowerCase() == lectures[i].teacher.toLowerCase()) {
					return true;
				}
				else if(lecture.auditorium.toLowerCase() == lectures[i].auditorium.toLowerCase()) {
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
			// А также обновляем данные в локальном хранилище (для хранения и последующей отправке бэкэнду).
			sync.updateData('teachers');
			return true;
		}
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
				sync.updateData('teachers');
				return true;
			}
		}
		else {
			// Если подобного объекта Teacher не существует, выводим соответствующее сообщение.
			console.error('Teacher ' + name + ' is not exists');
			return false;
		}
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
				if(name.toLowerCase() == teachers[i].name.toLowerCase()) {
					// Если существует такой объект, то удаляем его.
					delete teachers[i];
					// После delete teachers[i] в массиве teachers появляется значение undefined.
					console.info('Teacher ' + name + ' deleted');
					break;
				}
			}
			// Фильтруем массив минуя значения undefined (которые появляются после delete teachers[i]).
			teachers = teachers.filter(function(a) { return a !== undefined; });
			sync.updateData('teachers');
			return true;
		}
		return false;
	}
	// За правильность названия нижеследующих методов не берусь. :)
	/*
	 * Единственная особенность: временной интервал должен полностью охватывать время лекции, а не частично. Возможно, успею допилить до того, как вы взглянете.
	 * @param {string} name
	 * @param {Object|string} time (see function inputTime())
	 * @returns {Array|boolean}
	 */
	search(name, time) {
		console.log('Teacher.search(' + name + ', ' + time + ')');
		if(find(name, teachers)) {
			let output = [];

			if(typeof time == 'string') {
				time = inputTime(time);
			}

			for(let i = 0; i < lectures.length; i++) {
				if(name.toLowerCase() == lectures[i].teacher.toLowerCase()) {
					if(compareTime(time, lectures[i].time)) {
						output.push(lectures[i]);
					}
				}
			}
			return output;
		}
		return false;
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
						sync.updateData('lectures');
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
			let temp_lecture = find(name, lectures, true);
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
					sync.updateData('lectures');
					return true;
				}
			}
			else if(arg == 'teacher') {
				if(lecture.teacher == value) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					temp_lecture.teacher = value;
					if(!compareLectures(temp_lecture)) {
						lecture.teacher = value;
						console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
						sync.updateData('lectures');
						return true;
					}
					return false;
				}
			}
			else if(arg == 'auditorium') {
				if(lecture.auditorium == value) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					if(!exceedsCapacity(lecture.schools, value)) {
						temp_lecture.auditorium = value;
						if(!compareLectures(temp_lecture)) {
							lecture.auditorium = value;
							console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
							sync.updateData('lectures');
							return true;
						}
						return false;
					}
					return false;
				}
			}
			else if(arg == 'time') {
				if(inputTime(value)) {
					value = inputTime(value);
					if((value.start == lecture.time.start) && (value.end == lecture.time.end)) {
						console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
						return false;
					}
					else {
						temp_lecture.time = value;
						if(!compareLectures(temp_lecture)) {
							lecture.time = value;
							return true;
						}
						return false;
					}
				}
				return false;
			}
			else if(arg == 'schools') {
				value = value.split(', ');
				// Почему .toString? - Чтобы сравнить два массива в текстовом виде, не перебирая их. Ведь нам тут важно сравнить, абсолютно ли они идентичны.
				if(lecture.schools.toString().toLowerCase() == value.toString().toLowerCase()) {
					console.info('Lecture ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					if(findSchools(value, 2)) {
						temp_lecture.schools = value;
						if(!compareLectures(temp_lecture)) {
							lecture.schools = value;
							console.info('Lecture ' + name + ' edited arg ' + arg + ': ' + value);
							sync.updateData('lectures');
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
	}
	/*
	 * @param {string} name
	 * @returns {boolean}
	 */
	del(name) {
		console.log('Lecture.delete(' + name + ')');
		if(find(name, lectures)) {
			for(let i = 0; i < lectures.length; i++) {
				if(name.toLowerCase() == lectures[i].name.toLowerCase()) {
					delete lectures[i];
					console.info('Lecture ' + name + ' deleted');
					break;
				}
			}
			lectures = lectures.filter(function(a) { return a !== undefined; });
			sync.updateData('lectures');
			return true;
		}
		return false;
	}
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
			sync.updateData('schools');
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
					sync.updateData('schools');
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
					sync.updateData('schools');
					return true;
				}
			}
			else {
				console.error('School ' + name + 'doesn\'t have an argument ' + arg);
				return false;
			}
		}
	}
	/*
	 * @param {string} name
	 * @returns {boolean}
	 */
	del(name) {
		console.log('School.del(' + name + ')');
		if(find(name, schools)) {
			for(let i = 0; i < schools.length; i++) {
				if(name.toLowerCase() == schools[i].name.toLowerCase()) {
					delete schools[i];
					console.info('School ' + name + ' deleted');
					break;
				}
			}
			schools = schools.filter(function(a) { return a !== undefined; });
			sync.updateData('schools');
			return true;
		}
		return false;
	}
	/*
	 * @param {string} name
	 * @param {Object|string} time (see function inputTime())
	 * @returns {Array|boolean}
	 */
	search(name, time) {
		console.log('School.search(' + name + ', ' + time + ')');
		if(find(name, schools)) {
			let output = [];

			if(typeof time == 'string') {
				time = inputTime(time);
			}

			for(let i = 0; i < lectures.length; i++) {
				for(let j = 0; j < lectures[i].schools.length; j++) {
					if(name.toLowerCase() == lectures[i].schools[j].toLowerCase()) {
						if(compareTime({"start": start, "end": end}, lectures[i].time)) {
							output.push(lectures[i]);
						}
					}
				}
			}
			return output;
		}
		return false;
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
			sync.updateData('auditoriums');
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
					sync.updateData('auditoriums');
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
					sync.updateData('auditoriums');
					return true;
				}
			}
			else if(arg == 'location') {
				if(auditorium.location.toLowerCase() == value.toLowerCase()) {
					console.info('Auditorium ' + name + ' in arg ' + arg + ' have ' + value);
					return false;
				}
				else {
					auditorium.location = value;
					console.info('Auditorium ' + name + ' edited arg ' + arg + ': ' + value);
					sync.updateData('auditoriums');
					return true;
				}
			}
			else {
				console.error('Auditorium ' + name + 'doesn\'t have an argument ' + arg);
				return false;
			}
		}
	}
	/*
	 * @param {string} name
	 * @returns {boolean}
	 */
	del(name) {
		console.log('Auditorium.del(' + name + ')');
		if(find(name, auditoriums)) {
			for(let i = 0; i < auditoriums.length; i++) {
				if(name.toLowerCase() == auditoriums[i].name.toLowerCase()) {
					delete auditoriums[i];
					console.info('Auditorium ' + name + ' deleted');
					break;
				}
			}
			auditoriums = auditoriums.filter(function(a) { return a !== undefined; });
			sync.updateData('auditoriums');
			return true;
		}
		return false;
	}
	/*
	 * @param {string} name
	 * @param {Object|string} time (see function inputTime())
	 * @returns {Array|boolean}
	 */
	search(name, time) {
		console.log('Auditorium.search(' + name + ', ' + time + ')');
		if(find(name, auditoriums)) {
			let output = [];

			if(typeof time == 'string') {
				time = inputTime(time);
			}

			for(let i = 0; i < lectures.length; i++) {
				if(name.toLowerCase() == lectures[i].auditorium.toLowerCase()) {
					if(compareTime(time, lectures[i].time)) {
						output.push(lectures[i]);
					}
				}
			}
			return output;
		}
		return false;
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

// Класс работы с Local Storage API и синхронизация данных с backend'ом (в будущем).
class StorageManager {
	constructor(type) {
		this.type = type;
	}
	/*
	 * Метод предназначен для получения данных из локального хранилища.
	 * @param {string} type
	 * @returns {Array.Object|boolean}
	 */
	getData(type) {
		type = type.toLowerCase();
		if(isLocalStorageAvailable()) {
			if(type == 'teachers' || type == 'lectures' || type == 'schools' || type == 'auditoriums') {
				if(localStorage.getItem(type)) {
					return JSON.parse(localStorage.getItem(type));
				}
				return false;
			}
			return false;
		}
	}
	/*
	 * Метод предназначен для обновления изменяемых данных в локальном хранилище.
	 * @param {string} type
	 * @returns {boolean}
	 */
	updateData(type) {
		type = type.toLowerCase();
		if(isLocalStorageAvailable()) {
			if(type == 'teachers' || type == 'teacher') {
				localStorage.setItem(type, JSON.stringify(teachers));
				sync.sendData(type);
				return true;
			}
			else if(type == 'lectures' || type == 'lecture') {
				localStorage.setItem(type, JSON.stringify(lectures));
				sync.sendData(type);
				return true;
			}
			else if(type == 'schools' || type == 'school') {
				localStorage.setItem(type, JSON.stringify(schools));
				sync.sendData(type);
				return true;
			}
			else if(type == 'auditoriums' || type == 'auditorium') {
				localStorage.setItem(type, JSON.stringify(auditoriums));
				sync.sendData(type);
				return true;
			}
			else {
				console.error('Type ' + type + ' is not supported by API');
				return false;
			}
		}
		return false;
	}
	/*
	 * Данный метод предназначен для сбора и отправки данных из локального хранилища посредством XHR бэкэнду, который сохраняет данные в базе данных. Реализовать не проблемно, однако особой надобности не вижу, пока API доступно всем желающим (могут появиться нецензурные выражения в объектах, например).
	 */
	sendData(type) {}
}

var sync = new StorageManager();

var teachers = sync.getData('teachers') || TEACHERS,
	lectures = sync.getData('lectures') || LECTURES,
	schools = sync.getData('schools') || SCHOOLS,
	auditoriums = sync.getData('auditoriums') || AUDITORIUMS;

var teacher = new Teacher(),
	lecture = new Lecture(),
	school = new School(),
	auditorium = new Auditorium();

// Примитивное тестирование библиотеки.
function TestAPI(entryPoint) {
	if(typeof entryPoint == 'string') {
		entryPoint = entryPoint.toLowerCase();
	}
	if(entryPoint == 'teacher' || entryPoint == 1) {
		teacher.add('Терентьев');
		teacher.add('Ожогов');
		teacher.edit('Ожогов', 'Трофимов');
		teacher.edit('Ожогов', 'Свободная');
		teacher.del('Терентьев');
		teacher.get('Терентьев');
		teacher.get('Свободная');
	}
	else if(entryPoint == 'lecture' || entryPoint == 2) {
		lecture.add('Параллельные вычисления', 'Яковлев', 'Мобилизация', '01.04.2017 16:30, 01.04.2017 17:30', 'Школа мобильной разработки');
		lecture.add('Управление подразделениями', 'Свободная', 'Маркет', '01.04.2017 17:00, 01.04.2017 18:00', 'Школа менеджмента');
		lecture.edit('Управление подразделениями', 'name', 'Управление персоналом');
		lecture.del('Параллельные вычисления');
		lecture.get('Параллельные вычисления');
		lecture.get('Управление персоналом');
	}
	else if(entryPoint == 'school' || entryPoint == 3) {
		school.add('Школа обработки данных', 100);
		school.add('Школа обработки информации', 25);
		school.edit('Школа обработки данных', 'name', 'APEX');
		school.del('Школа обработки информации');
		school.edit('APEX', 'name', 'APEX');
		school.edit('APEX', 'students', 50);
		school.get('Школа разработки интерфейсов');
	}
	else if(entryPoint == 'auditorium' || entryPoint == 4) {
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

