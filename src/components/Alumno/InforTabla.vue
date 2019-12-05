<template>

    <div>
        <barra></barra>
        <v-card>
            <v-card-title>
            Alumnos
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" ></v-data-table> 
        </v-card>
    </div>
</template>

<script>
import ho from '../navBar/navBar'
import { API } from '../servicios/axios.js';     
  export default {
    components: {             
        'barra' : ho,    
    },
    data () {
      return {        
        search: '',
        headers: [
          { text: 'Nombre', align: 'left', sortable: false, value: 'name',},
          { text: 'Apellido', value: 'lastname' },
          { text: 'Direccion', value: 'direccion' },
          { text: 'matricula', value: 'matricula' },
          { text: 'Sexo', value: 'sexo' },
          { text: 'Edad', value: 'edad' },
          { text: 'Carrera', value: 'carrera' },
          { text: 'Acciones' },          
        ],
        
        desserts: [
            {name: '', lastame: '',direccion: '', matricula: '', sexo: '', edad: '', carrera: '' }
        ],
      }
    },
    mounted() {            
            console.log(localStorage.getItem("token"));
            //app.options('*', cors())            
            API.get('/alumno/alumno_lista/').then( response => {
                response.data.forEach(element => {                                                                              
                    console.log(response.data);                    
                    this.desserts = response.data
                });
            }, error => {
                console.error(error);
                
             });
            
        },    
}
</script>