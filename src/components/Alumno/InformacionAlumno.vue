<template>
    <div>
        <barra></barra>
        <!-- <template>
            <v-card>
                <v-card-title> Alumnos 
                    <v-spacer></v-spacer> 
                    <v-text-field v-model="search"  label="Search" single-line hide-details ></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="desserts" :search="search" ></v-data-table>
            </v-card>            
        </template>         -->

        <br>
        <v-container v-model="seleccion">  
            <v-layout >
                <v-flex xs3 sm3 offset-sm1 v-for="item in informacion" v-bind:key="item.id">
                    <v-card class="mx-auto" max-width="344" outlined >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-4">{{item.matricula}}</div>
                                    <v-list-item-title class="headline mb-1">{{item.id}} {{item.name}}</v-list-item-title>
                                    <v-list-item-subtitle>{{item.direccion}}</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar > 
                                <v-avatar color="indigo"  size="60">
                                    <v-icon dark>mdi-account-circle</v-icon>
                                </v-avatar>
                            </v-list-item-avatar>
                        </v-list-item>
                        <v-card-actions>                                
                            <v-btn depressed color="info" >
                                <router-link :to="{name: 'EditarAlumno', params: { id: item.id}}" >Edit</router-link>
                            </v-btn>
                            
                            <v-btn depressed color="error" v-on:click="deletesus(item.id)">Delete</v-btn>                            
                        </v-card-actions>
                    </v-card>                
                </v-flex>    
            </v-layout>
        </v-container>
        <v-btn flat  href="/formularioAlumno">
            <span class="mr-1" style="color:#1A8547">Agregar</span>        
          </v-btn>   
    </div>
    
</template>



<script>
    import ho from '../navBar/navBar'
    import { API } from '../servicios/axios.js';       
    
    export default {        
        name: 'App',    
        components: {             
            'barra' : ho,    
        },
        data () {            
            return {                
                informacion: [],                                                  
            }            
        },
        mounted() {            
            console.log(localStorage.getItem("token"));
            //app.options('*', cors())            
            API.get('/alumno/alumno_lista/').then( response => {
                response.data.forEach(element => {                                                                              
                    console.log(element);                    
                    this.informacion = response.data                    

                });
            }, error => {
                console.error(error);
                
             });
            
        },
        created() {
            this.token = localStorage.getItem("token")
            this.all();
        },
        methods:{
            deletesus: function(subscription){
                console.log(subscription);
                API.delete(`alumno/alumno_Delete/${subscription}`).then(response => {
                        this.$router.push('/informacionAlumno')
                        
                    })
            },                        
        }
    }
</script>