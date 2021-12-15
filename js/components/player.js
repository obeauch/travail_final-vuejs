import externalTemplate from '../externalTemplate.js'

export default externalTemplate({

    template_url: "js/components/player.html",

    data() {
        return {
            chansons: [],
            texte_input: "",
            chanson_selection: false,
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
        jouerChanson() {
            this.chanson_selection = true
        }

    },
})