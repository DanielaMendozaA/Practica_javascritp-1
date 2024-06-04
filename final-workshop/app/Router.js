import { NavbarLayout } from "./components/navbar-layout/navbar-layout.component";
import { routes } from "./routes";
import { NavarLayoutPublic } from "./components/navbar-layout-public/navbar-layout-public.component";

export function Router(){
    const path = window.location.pathname;

    if(path === '/login' || path === '/' || path === '/register'){
        if(localStorage.getItem('token')){
            navegateTo('/tasks');
            return;
        }
        
    }
    
    if(path === '/'){
        if(!localStorage.getItem('token')){
            navegateTo('/login');
            return;
        }
    }
  
    
    const publicRoute = routes.public.find(route => route.path === path);
    const privateRoute = routes.private.find(route => route.path === path);

    if(publicRoute){
        const { pageContent, logic } = publicRoute.page();
        NavarLayoutPublic(pageContent, logic);
        return;
    }
    
    if(privateRoute){
        if(localStorage.getItem('token')){
            const { pageContent, logic } = privateRoute.page();
            NavbarLayout(pageContent,logic)
            return;
        }
   
    }

    navegateTo('/not-found');

}

export function navegateTo(path, state = {}){
    window.history.pushState({} , '', window.location.origin + path);
    if(state.userId){
        localStorage.setItem('IdFromUser', state.userId)
    }

    Router(); 
}