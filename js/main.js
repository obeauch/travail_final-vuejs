// import externalTemplate from '../externalTemplate.js'

// export default externalTemplate({

//     template_url: "js/components/accueil.html",

const app = {
    components: {

    },

    data() {
        return {
            chansons: [],

        }
    },


    mounted() {

        // faire un copier coller fetch pour tout projet
        fetch("chansons.json").then(resp => {
            resp.json().then(contenu_json => {
                this.chansons = contenu_json
            })
        })


    },
    methods: {


    },
}


Vue.createApp(app).mount("#app")