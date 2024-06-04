usersApi.map(user => {
    const userDiv = document.createElement('div');
    const userInfo = `
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
        </table>
    `;
    const btn = document.createElement('button');
    btn.classList.add('selected-user');
    btn.textContent = 'Mostrar/Ocultar información';

    btn.addEventListener('click', () => {
        if (btn.nextSibling) {
            btn.nextSibling.remove();
        } else {
            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = userInfo;
            userDiv.appendChild(infoDiv);
        }
    });

    userDiv.appendChild(btn);
    $containerUsers.appendChild(userDiv);
});