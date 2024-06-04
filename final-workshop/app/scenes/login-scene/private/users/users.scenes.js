import { navegateTo } from "../../../../Router";
import { fetchApi } from "../../../../helpers/fetch-api";
import styles  from './users.styles.css'

export function UsersScene(){
    
    const pageContent = `
        <div id="container-users"></div>
    
    `;

    const logic = async () => {

        const usersApi = await fetchApi(`http://localhost:3000/users`)
        const $containerUsers = document.getElementById('container-users');
        $containerUsers.innerHTML += 
        usersApi.map(user => {
            return `
                <div>
                    <table border=1>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Id de Usuario</th>
                    </tr>
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.id}</td>
                    </tr>
                    <tr>
                         <td colspan="2">
                            <button disabled class="selected-user">Seleccionado</button>
                            <button class="toggle-button" id="${user.id}">Seleccionar Usuario</button>
                         </td>
                      
                        <td>
                            <button class="add-task" data-user-id="${user.id}">Agregar Tarea</button>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3">
                            <div id="container-task-by-user${user.id}" class=${styles.containerTask}></div>
                        </td>
                    
                    </tr>
                </table>

            

                </div>
            
            `
        }).join('');//Cierre map

       const $addButtons = document.querySelectorAll('.add-task');
        $addButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.getAttribute('data-user-id')
                navegateTo('/tasks' , { userId: userId})

            })

        })


        const $toggleButtons = document.querySelectorAll('.toggle-button');
        // const $selectedUser = document.querySelectorAll('.selected-user')
        $toggleButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const selectedButton = btn.previousElementSibling;
                selectedButton.disabled = !selectedButton.disabled
                
                const userId = btn.id
                const $containerTaskByUser = document.getElementById(`container-task-by-user${userId}`);
                
                if(!selectedButton.disabled){
                    const taskByUserId = await fetchApi(`http://localhost:3000/tasks?idUser=${userId}`)

                    $containerTaskByUser.innerHTML = `
                        ${taskByUserId.map(task => {
                            return `
                                <div>
                                    <p>${task.title}</p>
                                    <p>${task.priority}</p>
                                    <p>${task.status}</p>
                                    <button class="preview-task" data-id="${task.id}">Vista Previa</button>

                                </div>
                            
                            
                            `;


                        }).join('')}

                    
                    `;


                    $containerTaskByUser.style.display = "block"
                    const $previewBtns = document.querySelectorAll('.preview-task');
                    $previewBtns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            navegateTo(`/tasks/preview?taskId=${btn.getAttribute('data-id')}`)
                        })

                    })


                }else{

                    $containerTaskByUser.style.display = "none"
                }


                
            });
        });



    }

    return {
        pageContent,
        logic
    }

}