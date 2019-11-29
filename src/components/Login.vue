<template>  
  <div>
  
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          <v-card-text>
            <v-form  ref="form" @submit.prevent="submit">
                <v-col cols="12">              
                  <v-text-field v-model="user" :rules="rulesuser" counter="25" hint="This field uses counter prop" label="User"  ></v-text-field>
                </v-col>            
                <v-col cols="12" >
                  <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1" ></v-text-field>
                </v-col>                
              <v-card-actions>
                    <v-btn class="button" color="primary" type="submit" dark large> Save </v-btn>                    
                </v-card-actions> 
            </v-form>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>    
</template>

<script>
  import { API } from './servicios/axios.js';   
import { log } from 'util';
  export default {
    data () {
      return {
        show1: false,        
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
        user: '',
        description: 'California is a state in the western United States',
        rulesuser: {
          required: value => !! value || 'required',
         max: v => v.length <= 10 || 'Max 10 characters' 
        }
      }
    },
    methods:{
        submit(){                                        
          API.post('/login/',{
            username: this.user,
            password: this.password
          }).then((response)=>{
            console.log(response.data.token);            
            this.$router.push({path: '/informacionAlumno'})         
            localStorage.setItem( 'token',response.data.token)
          })
        }
    }
  }
</script>