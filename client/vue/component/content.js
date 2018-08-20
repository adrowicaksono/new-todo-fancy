const Content = {
    template : `
                  <div class="container">
                    <section class="section" v-for="todo in todos">
                       
                            <div class="columns">
                                <div class="column">
                                    <div class="card" v-show="!isEditing">
                                        <header class="card-header is-size-1-mobile">
                                            <p class="card-header-title" >
                                            {{ todo.title }}, <span> {{dateFormat(todo.deadline)}} </span>
                                            </p>
                                            <a class="card-header-icon">
                                            <span class="status">
                                                <!-- todo status tags -->
                                                <a  class="button is-success is-small has-text-weight-semibold" 
                                                    v-show="!isEditing && todo.status" 
                                                    disabled
                                                >
                                                Completed
                                                </a>
                                                <a  class="button is-danger is-small has-text-weight-semibold" 
                                                    v-on:click="completeTodo(todo)" 
                                                    v-show="!isEditing && !todo.status"
                                                >
                                                Pending
                                                </a>
                                            </span>
                                            </a>
                                        </header>
                                        
                                        <div class="card-content">
                                            <div class="content">
                                            {{ todo.task }}
                                            </div>
                                            <div class="content">
                                                <input class="input" type="tags" placeholder="Add Tag" v-bind:value="todo.tag" disabled>
                                            </div>
                                        </div>
                                    
                                        <footer class="card-footer">
                                            <a class="card-footer-item" 
                                                v-on:click="show(todo)">
                                                <span><img src="https://png.icons8.com/nolan/30/000000/edit.png"></span>
                                            </a>
                                            <a class="card-footer-item" 
                                                v-on:click="meetUp(todo)">
                                                <span><img src="https://png.icons8.com/nolan/50/000000/user-group-man-man.png"></span>
                                            </a>
                                            <a class="card-footer-item" 
                                                v-on:click="remove">
                                                <span><img src="https://png.icons8.com/nolan/30/000000/delete.png"></span>
                                            </a>
                                        </footer>
                                    </div>
                                </div> 
                            </div>
                    </section>
                </div>
               
                `,
    props : ['todos'],
    data () {
        return {
            isEditing : false,
        }
    },
    methods:{
        show(todo){
            console.log( todo,"showTodo mau di edit")
            this.$emit('show-form', todo)
        },
        remove (todo) {
            let id = todo._id
            axios
            .delete(`https://test.adrowicaksono.xyz/task?id=${id}`,{
              headers:{
                token:localStorage.getItem('token')
              }
            })
            .then(function(response){
              window.location.replace('/home.html')
            })
            .catch(function(err){
              console.log(err.message)
            })
          },
          dateFormat(date){
            let day = new Date(date).getDate()
            let month = new Date(date).getMonth()
            let year = new Date(date).getFullYear()
            return `${day}/${month}/${year}`
          },
        meetUp (todo) {
            this.$emit('meeting', todo)
        }
    }
}


 