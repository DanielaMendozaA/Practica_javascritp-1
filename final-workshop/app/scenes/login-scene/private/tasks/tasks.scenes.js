import { navegateTo } from "../../../../Router";
import { fetchApi } from "../../../../helpers/fetch-api";
import styles from './tasks.scenes.css';

export function TaskScenes(){
  const pageContent = `
    <form name="form">
      <input type="text" placeholder="Titulo de la tarea" id="title"/>
      <input type="text" placeholder="Descripcion de la tarea" id="desciption"/>
      <select name="priority">
        <option value="" disabled selected>---Selecciona algo---</option>
        <option value="HIGH">Alta</option>
        <option value="MEDIUM">Media</option>
        <option value="LOW">Baja</option>
      </select>
      <select name="status">
        <option value="" disabled selected>---Selecciona algo---</option>
        <option value="COMPLETED">Completado</option>
        <option value="NOCOMPLETED">No completado</option>
      </select>
      <input type="date" id="date"/>
      <input type="submit"/>   
    </form>
    <div id="all-tasks"></div>
    
    `;
  const logic = async () => {

    const $form = document.getElementsByName('form')[0];
    const $tasksContainer = document.getElementById('all-tasks');

    const allTasks = await fetchApi('http://localhost:3000/tasks')
    
    allTasks.forEach((task) => {
      $tasksContainer.innerHTML += `
      <div class=${styles.containerCard}>
        <p>${task.title}</p>
        <p>${task.date}</p>
        <p class="p-userId" user-id="${task.idUser}"></p>
        <button class="edit-btn" data-id="${task.id}">Editar</button>
        <button class="delete-btn" data-id="${task.id}">Eliminar</button>
        <button class="preview-btn" data-id="${task.id}">Vista Previa</button>
      </div>
      `;
    });

    const $parUser = document.querySelectorAll('.p-userId');
    $parUser.forEach(async p => {
      const repApi = await fetchApi(`http://localhost:3000/users/${p.getAttribute('user-id')}`) 
      p.innerHTML = `
        Creado por: ${repApi.name}
      `

    });



    const $previewBtn = document.querySelectorAll(".preview-btn");
    $previewBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        navegateTo(`/tasks/preview?taskId=${btn.getAttribute('data-id')}`)

      })

    })
    
    const $editBtn = document.querySelectorAll(".edit-btn");
    $editBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        navegateTo(`/tasks/edit?taskId=${btn.getAttribute('data-id')}`)

      })

    });

    

    const $deleteBtn = document.querySelectorAll(".delete-btn");
    $deleteBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        // navegateTo(`/tasks/delete?taskId=${btn.getAttribute('data-id')}`)
        const aceptar = confirm("Estas seguro de que deseas eliminar esta tarea?")
        if(aceptar){
          const idToDelete = btn.getAttribute('data-id')
          fetchApi(`http://localhost:3000/tasks/${idToDelete}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })//Cierre fetch
        }


      })//Cierre del evento btn

    })
   

    $form.addEventListener('submit', (e) => {


      e.preventDefault();

      const userId = localStorage.getItem('userId')
      const idFromUser = localStorage.getItem('IdFromUser')
      let idToSend
      if(!idFromUser){
        idToSend = userId
      }else{
        idToSend = idFromUser
      }

      const $inputTitle = document.getElementById('title').value;
      const $inputDescription = document.getElementById('desciption').value;
      const $inputSelectpPriority = document.querySelector('[name="priority"]').value;
      const $inputSelectStatus = document.querySelector('[name="status"]').value;
      const $inputDate = document.getElementById('date').value;

      fetchApi('http://localhost:3000/tasks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: $inputTitle,
          description: $inputDescription,
          priority: $inputSelectpPriority,
          status: $inputSelectStatus,
          date: $inputDate,
          idUser: idToSend

        })
      }).then(jsonObject => {
        console.log(jsonObject);
      })//Cierre fetch y promesas

     localStorage.removeItem('IdFromUser')
      
    });//Cierre $form.addEventListener

  
    
  } // Cierre logic

  return {
    pageContent,
    logic
  }
}