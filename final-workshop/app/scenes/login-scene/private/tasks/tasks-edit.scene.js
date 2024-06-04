import { fetchApi } from "../../../../helpers/fetch-api";

export function TaskEditpage(){
    const pageContent = `
    <form name="form">
        <input type="text" placeholder="Titulo de la tarea" id="title"/>
        <input type="text" placeholder="Descripcion de la tarea" id="description"/>
        <select name="priority">
        <option value="" disabled selected>---Selecciona algo---</option>
        <option value="HIGH">Alta</option>
        <option value="MEDIUM">Media</option>
        <option value="LOW">Baja</option>
        </select>
        <input type="date" id="date"/>
        <input type="submit"/>   
    </form>
    `;

    const logic = async () =>{
        const searchParams = window.location.search;
        const paramsTransformed = new URLSearchParams(searchParams)
        const taskId = paramsTransformed.get('taskId')
        console.log("El id es", taskId);
        
        const fetchTaskId = await fetchApi(`http://localhost:3000/tasks/${taskId}`)
        console.log(fetchTaskId);

        const $inputTitle = document.getElementById('title');
        const $inputDescription = document.getElementById('description');
        const $inputSelect = document.querySelector('[name = "priority"]');
        const $inputDate = document.getElementById('date');

        $inputTitle.value = fetchTaskId.title;
        $inputDescription.value = fetchTaskId.description;
        $inputSelect.value = fetchTaskId.priority
        $inputDate.value = fetchTaskId.date

        const $form = document.getElementsByName('form')[0];
        console.log($form);
        $form.addEventListener('submit', (e) => {
            e.preventDefault();

            const $inputTitleToUp = document.getElementById('title').value;
            const $inputDescriptionToUp = document.getElementById('description').value;
            const $inputSelectToUp = document.querySelector('[name = "priority"]').value;
            const $inputDateToUp = document.getElementById('date').value;

            fetchApi(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: $inputTitleToUp,
                    description: $inputDescriptionToUp,
                    priority: $inputSelectToUp,
                    date: $inputDateToUp
                })


            }).then(jsonObject => {
                console.log(jsonObject);
            })



        })




    }

    return {pageContent, logic};

}