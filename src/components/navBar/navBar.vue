<template>
    <div>
        <v-toolbar app style="background-color:#27ABB6">                 
          <v-toolbar-title class="headline text-uppercase">
                <router-link to="/informacionAlumno" style="text-decoration: none;color: white;">
                    <span>Gestion de </span>
                     <span class="font-weight-light">Alumnos</span>
                </router-link>
            </v-toolbar-title>
                  
        </v-toolbar>             
    </div>            
</template>

<script>  
  export default {
    data: () => ({
      Nombre:'',
      Apellidos:'',
      fav: true,
      menu: false,
      message: false,
      hints: true
    }),    
  }
</script>