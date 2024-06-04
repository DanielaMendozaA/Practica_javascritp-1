import { fetchApi } from '../../../../helpers/fetch-api';
import styles from './register.css';
import { navegateTo } from '../../../../Router';
import { encryptData } from '../../../../helpers/encrypt';

export function RegisterScene(){
    const pageContent = `
        <form class=${styles.form}>
            <input type="text" placeholder="Name" autocomplete="name" />
            <input type="email" placeholder="Email" autocomplete="email" />
            <input type="password" placeholder="Password" autocomplete="password" />
            <button type="submit">Register</button>
        </form>
    `;

    const logic = () => {
    const $nameHtml = root.querySelector('input[type="text"]');
    const $emailHtml = root.querySelector('input[type="email"]');
    const $passwordHtml = root.querySelector('input[type="password"]');
    const $myForm = root.getElementsByTagName('form')[0];

  
    $myForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if(!$nameHtml.value || !$emailHtml.value || !$passwordHtml.value ){
            alert('Please fill all required fields')
            return;
    
        }

        const userCreated = await fetchApi('http://localhost:3000/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: $nameHtml.value,
                email: $emailHtml.value,
                password: encryptData($passwordHtml.value)
            })
        })

        if (userCreated) {
            alert('User created successfully');
            navegateTo('/login');
          } else {
            alert('Failed to create user');
          }
    });
}

    return {
        pageContent,
        logic
    }

}
