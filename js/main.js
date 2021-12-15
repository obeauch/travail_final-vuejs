
import accueil from './components/accueil.js'
import player from './components/player.js'

const app = {
    components: {
        "accueil": accueil,
        "player": player,
    },

    data() {
        return {
            page: "accueil",
            player: null,

        }
    },

    mounted() {

    },

    methods: {
        changerPage(nouvelle_page, player_page) {
            this.page = nouvelle_page
            this.player = player_page
        }

    },
}


Vue.createApp(app).mount("#app")