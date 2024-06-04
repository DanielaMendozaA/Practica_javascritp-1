import { navegateTo } from '../../../../Router';
import { decryptData } from '../../../../helpers/encrypt';
import { fetchApi } from '../../../../helpers/fetch-api';
import styles from './login.css';

export function LoginScene(){
    const pageContent = `
        <form>
            <input type="email" name="username" placeholder="Username" autocomplete="email" >
            <input type="password" name="password" placeholder="Password" autocomplete="current-password">
            <button type="submit">Login</button>

        </form>
    `;

    const logic = () => {  
        const $inputHtml = root.querySelector('input[type="email"]');
        const $passwordHtml = root.querySelector('input[type="password"]');

        const $myForm = root.getElementsByTagName('form')[0];
        $myForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if(!$inputHtml.value || !$passwordHtml.value){
                alert('Please fill all required fields')
                return;
            }

            const users = await fetchApi('http://localhost:3000/users')
            const user = users.find(user => user.email === $inputHtml.value && decryptData(user.password) === $passwordHtml.value);

            if(user){
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.id)
                navegateTo('/tasks')

            }else{
                alert('Usuario no econtrado')

            }
        });


}

return {
    pageContent,
     logic
    }

}