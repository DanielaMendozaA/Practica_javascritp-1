export function NavarLayoutPublic(pageContent, logic){
    const root = document.getElementById('root');
    root.innerHTML = `
        <nav>
            <a href="/aboutUs">About Us</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            ${pageContent}
        
        </nav>

    `;

    logic();

}