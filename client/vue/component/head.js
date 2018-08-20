const Head = {
    template:`
                <section class="hero is-primary">
                    <div class="hero-body">
                        <div class="container">
                            <div class="columns">
                                <div class="column">
                                    <p>{{owner}}</p>
                                </div>
                                <div class="column">
                                    <button id="logout" 
                                        class="button is-link is-outlined is-right"
                                        v-on:click="onLogout" 
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <h1 class="title is-large">it's your to do</h1>
                                </div>
                            </div>
                            <div id="todoStats" class="tabs is-fullwidth">
                                <!-- all todo stats -->
                                <ul>
                                    <li>
                                    <p class="has-text-weight-semibold">
                                        Completed : 
                                        <span>{{todos.filter(todo => {return todo.status === true}).length}}</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p class="has-text-weight-semibold">
                                            Pending : 
                                            <span>{{ todos.filter(todo => {return todo.status === false}).length}}</span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>    
                    </div>
                </section>    
            `,
    props:['owner', 'todos'],
    methods:{
        onLogout () {
            this.$emit('logout')
        }
    }
}