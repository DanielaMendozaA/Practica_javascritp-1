import { LoginScene } from "./scenes/login-scene/public/login-scene/login.scene"
import { NotFoundScene } from "./scenes/login-scene/public/not-found-scene/not-found-scene"
import { RegisterScene } from "./scenes/login-scene/public/register-scene/register.scene"
import { TaskScenes } from "./scenes/login-scene/private/tasks/tasks.scenes"
import { UsersScene } from "./scenes/login-scene/private/users/users.scenes"
import { TaskEditpage } from './scenes/login-scene/private/tasks/tasks-edit.scene'
import { PreviewPage } from "./scenes/login-scene/private/tasks/tasks-preview.scene"


export const routes = {

    public: [
        {path: '/login', page: LoginScene},
        {path: '/not-found', page: NotFoundScene},
        {path: '/register', page: RegisterScene},
     ],
    private: [
        {path: '/tasks', page: TaskScenes},
        {path: '/profile', page: UsersScene},
        {path: '/tasks/edit', page: TaskEditpage},
        {path: '/tasks/preview', page: PreviewPage},
    ]

}   