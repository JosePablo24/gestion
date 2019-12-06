<template>
    <div>
        <barra></barra>
        <v-container fluid>
            <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :page="page" :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer >
                <template v-slot:header>
                    <v-toolbar dark color="blue darken-2" class="mb-0" >
                    <v-text-field v-model="search" clearable flat solo-inverted hide-details label="Search" ></v-text-field>
                        <template v-if="$vuetify.breakpoint.mdAndUp">
                                <v-spacer></v-spacer>
                            <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys" label="Sort by" ></v-select>
                                <v-spacer></v-spacer>
                            <v-btn-toggle v-model="sortDesc" mandatory >
                                <v-btn large depressed color="blue" :value="false" >
                                    <v-icon>mdi-arrow-up</v-icon>
                                </v-btn>
                                <v-btn large depressed color="blue" :value="true" >
                                    <v-icon>mdi-arrow-down</v-icon>
                                </v-btn>
                                </v-btn-toggle>
                        </template>  
                    </v-toolbar>
                </template>

                <template v-slot:default="props">
                    <v-row>
                        <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3"  >
                            <v-card>
                                <v-card-title class="subheading font-weight-bold">
                                    {{item.id}} .-
                                    {{ item.name }}
                                    <v-spacer></v-spacer>
                                    <v-list-item-avatar > 
                                        <v-avatar color="indigo"  size="30">
                                            <v-icon dark>mdi-account-circle</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                </v-card-title>              
                                <v-divider></v-divider>                    
                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <div class="overline mb-1">Apellido:   {{item.lastname}}</div>
                                                <v-list-item-subtitle>Matricula:   {{item.matricula}}</v-list-item-subtitle>
                                                <v-list-item-subtitle>Direccion:   {{item.direccion}}</v-list-item-subtitle>
                                                <v-list-item-subtitle>Carrera:   {{item.carrera}}</v-list-item-subtitle>
                                                <v-list-item-subtitle>Edad:   {{item.edad}} <v-spacer></v-spacer> Sexo:   {{item.sexo}}</v-list-item-subtitle>
                                                <div class="my-1">
                                                    <v-btn color="primary" fab small dark @click="$router.push(`EditarAlumno/${ item.id}`)">                                                        
                                                            <v-icon>mdi-pencil</v-icon>                                                        
                                                    </v-btn>    
                                                    <v-btn color="error" fab small dark v-on:click="deletesus(item.id)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </div>                                                                                                
                                        </v-list-item-content>
                                    </v-list-item>                        
                                </v-list>              
                            </v-card>
                        </v-col>
                    </v-row>
                </template>

                <template v-slot:footer>
                    <v-row class="mt-2" align="center" justify="center">
                        <span class="grey--text">Students per page</span>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn dark text color="primary" class="ml-2" v-on="on" > {{ itemsPerPage }} 
                                        <v-icon>mdi-chevron-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>                
                                    <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index" @click="updateItemsPerPage(number)">
                                        <v-list-item-title>{{ number }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <v-spacer></v-spacer>          
                            <v-btn class="mx-2" fab dark color="indigo" href="/formularioAlumno" style="align: right">
                                <v-icon dark>mdi-plus</v-icon>
                            </v-btn>      
                            <span class="mr-4 grey--text" >
                                    Page {{ page }} of {{ numberOfPages }}
                            </span>
                            <v-btn fab dark color="blue darken-3" class="mr-2" @click="formerPage" >
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage" >
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-container>
    </div>  
</template>

<script>
import ho from '../navBar/navBar'
import { API } from '../servicios/axios.js';   
    export default {
        components: {             
            'barra' : ho,
            //'botoneditar': <v-btn depressed color="info" >Editar</v-btn>,
        },
        data () {
            return {
                itemsPerPageArray: [4, 8, 12],
                search: '',
                filter: {},
                sortDesc: false,
                page: 1,
                itemsPerPage: 4,
                sortBy: 'id',
                keys: ['id', 'name', 'lastname', 'direccion', 'matricula', 'sexo', 'edad', 'carrera',],
                items: [ 
                    {id: '', name: '', lastname: '',direccion: '', matricula: '', sexo: '', edad: '', carrera: ''}          
                ],
            }
        },
        computed: {
            numberOfPages () { 
                return Math.ceil(this.items.length / this.itemsPerPage)
            },
            filteredKeys () {
                return this.keys.filter(key => key !== `Name`)
            },
        },
        methods: {
            nextPage () {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage () {
                if (this.page - 1 >= 1) this.page -= 1
            }, 
            updateItemsPerPage (number) {
                this.itemsPerPage = number
            },
            deletesus: function(subscription){
                    console.log(subscription);
                    API.delete(`alumno/alumno_Delete/${subscription}`).then(response => {                            
                            console.log("se hizo");
                            API.get('/alumno/alumno_lista/').then( response => {
                                response.data.forEach(element => {                                                                              
                                    console.log(response.data);                    
                                    this.items = response.data                    
                                });
                            }, error => {
                                console.error(error);                
                            });                                  
                    })                    
            },    
        },
        mounted() {            
            console.log(localStorage.getItem("token"));
            //app.options('*', cors())            
            API.get('/alumno/alumno_lista/').then( response => {
                response.data.forEach(element => {                                                                              
                    console.log(response.data);                    
                    this.items = response.data                    
                });
            }, error => {
                console.error(error);                
             });                         
        },    
    }
</script>