import { navegateTo } from "../../Router";

export function NavbarLayout(pageContent, logic){
    const root = document.getElementById('root');

    const logOut = ` <button id="logout">Logout</button>`

    root.innerHTML = `
    
        <nav>
            <a href="/tasks">Tasks</a>
            <a href="/profile">Profile</a>
            <a href="#">Logout</a>
            ${logOut}
        </nav>
        ${pageContent}
    
    `;

    logic();

    // const $logoutAnchor = document.querySelector('[href="/logout"]');


    const $logOutButton = root.querySelector('#logout');
    $logOutButton.addEventListener('click', (e) =>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('IdFromUser');
        navegateTo('/login');
    });
}