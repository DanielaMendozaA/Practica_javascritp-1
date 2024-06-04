import { fetchApi } from "../../../../helpers/fetch-api";

export function PreviewPage(){
    const pageContent = `
        <div id="container"></div>
    
    `
    const logic = async () => {
        const searchParams = window.location.search;
        const paramsTransformed = new URLSearchParams(searchParams)
        const taskId = paramsTransformed.get('taskId')
        
        const taskApi = await fetchApi(`http://localhost:3000/tasks/${taskId}`)
        const $container = document.getElementById('container');
        console.log(taskApi);
        $container.innerHTML += `
            <div>
                 <ul>
                    
                    <li>${taskApi.title}</li>
                    <li>${taskApi.description}</li>
                    <li>${taskApi.status}</li>
                    <li>${taskApi.date}</li>
                    
                    
                </ul>
                
            </div>
        
        `

    }

    return {
        pageContent,
        logic
    }

}