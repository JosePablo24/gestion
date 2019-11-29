<template>
    <div>
        <barra></barra>  
        <div style="">
            <v-form ref="form" @submit.prevent="submit" >
                
                <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Name" value="informacion.name" required ></v-text-field>

                <v-text-field v-model="lastName" :counter="20" :rules="nameRules" label="Last Name" required ></v-text-field>
    
                <v-text-field v-model="address" :rules="[v => !!v || 'Item is required']" label="Address" required ></v-text-field>

                <v-text-field v-model="matricula" :rules="[v => !!v || 'Item is required']" label="Matricula" required ></v-text-field>

                <v-select v-model="sexo" :items="sexo" :rules="[v => !!v || 'Item is required']" label="Sexo" required ></v-select>

                <v-select v-model="edad" :items="edad" :rules="[v => !!v || 'Item is required']" label="Edad" required ></v-select>

                <v-select v-model="carrera" :items="carrera" :rules="[v => !!v || 'Item is required']" label="Carrera"  required ></v-select>                

                
                <v-card-actions>
                    <v-btn class="button" color="primary" type="submit" dark large> Save </v-btn>
                    <v-btn class="button" color="error" href="/informacionAlumno" dark large> Cancel </v-btn>
                </v-card-actions>                                
                
            </v-form>      
                         
        </div>    
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
        data: () => ({
                valid: true,
                name: '',
                lastName: '',
                address: '',                                                
                matricula: '',
                informacion: [],
                
                nameRules: [
                v => !!v || 'this field is required',
                v => (v && v.length <= 20) || 'Name must be less than 20 characters',
                ],                        
                carrera: [
                    'Ing. Desarrollo de software',
                    'Ing. Sistemas computacionales',                
                ],
                sexo: [
                    'Hombre',
                    'Mujer',                
                ],
                edad: [
                    '17','18','19','20','21','22','23','24','25',
                ],
            }),

        methods:{
                submit(){                                
    // //                if (this.name != false && this.sexo != false&& this.carrera != false && this.select != false && this.address != false) {                    
                        API.put(`/alumno/alumno_detail/${this.informacion.id}`,{
                            name: this.name,
                            lastname: this.lastName,
                            direccion: this.address,
                            sexo: this.sexo,
                            edad: this.edad,                        
                            matricula: this.matricula,
                     }).then(response => {
                        this.$router.push('/informacionAlumno');
                    })         
                 }
            },
        mounted(){
            API.get('alumno/alumno_detail/'+this.$route.params.id).then(response => {
                console.log(response.data);
                
                this.informacion = response.data
                console.log(this.informacion.id);
                
                
            })

        },
    }
</script>