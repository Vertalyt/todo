import { colorStatusToDo } from '@/constants'

export function setItemLocal(arr) {
  localStorage.setItem('toDoRecords', JSON.stringify(arr));
}

export function getItemLocal() {
  const storedData = localStorage.getItem('toDoRecords');
  if (storedData) {
    return sortByDate(JSON.parse(storedData));
  } else return []
}


// Функція для отримання сьогоднішньої дати у форматі YYYY-MM-DD
export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


// Функція для виділення даних за сьогоднішній день
export function separateByTodaysDate(arr) {
  const today = [];
  const rest = [];
  const todayData = getTodayDate();

  arr.forEach(element => {
    if (Object.keys(element)[0] === todayData) {
      today.push(element);
    } else {
      rest.push(element);
    }
  });
  return { today, rest };
}


// Функція для сортування масиву за датою
export function sortByDate(arr) {
  return arr.sort((a, b) => {
    const dateA = Object.keys(a)[0];
    const dateB = Object.keys(b)[0];

    return new Date(dateA) - new Date(dateB);
  });
}


export function bringingKey(task) {
  return Object.keys(task)[0]
 }


 // визначаю необхідний колір по статусу
 export function statusToDo(task, date) {
   const dateToDo = new Date(date).getTime()
   const todayDate = new Date(getTodayDate()).getTime()
   if(dateToDo < todayDate) {
    return task.check ? colorStatusToDo[2]: colorStatusToDo[0]
   }

   if(dateToDo >= todayDate) {
    return task.check ? colorStatusToDo[2]: colorStatusToDo[1]
   }

 }

 // додаю в масив справ колір статусу завдання
 export function addFillColor(arr) {
  return arr.map(item => {
    const date = Object.keys(item)[0]
    const updateResult = Object.values(item)[0].map(el => {
      const fill = statusToDo(el, date);
      return { ...el, fill };
    })
    return { [date] : updateResult }
 });
 }
