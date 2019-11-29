import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import InformacionAlumno from './components/Alumno/InformacionAlumno.vue'
import FormularioAlumno from './components/Alumno/FormularioAlumno.vue'
import nav from './components/navBar/navBar.vue'
import EditarAlumno from './components/Alumno/EditarAlumno.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: "history",
    routes: [
        {
          path: "/",
          name: "home",
          component: HelloWorld
        },
        {
          path: "/login",
          name: "Login",
          component: Login
        },
        {
          path: "/informacionAlumno",
          name: "InformacionAlumno",
          component: InformacionAlumno
        },
        {
          path: "/formularioAlumno",
          name: "FormularioAlumno",
          component: FormularioAlumno
        },
        {
          path: "/editarAlumno/:id",
          name: "EditarAlumno",
          component: EditarAlumno
        },        
        {
          path: "/nav",
          name: "nav",
          component: nav
        },
        
        
    ]});