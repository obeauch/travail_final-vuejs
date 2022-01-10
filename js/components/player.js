import externalTemplate from '../externalTemplate.js'

export default externalTemplate({

    template_url: "js/components/player.html",

    data() {
        return {
            chansons: [],
            texte_input: "",
            chanson_selection: "",
            audio: new Audio(),
            musique_joue: false,
            temps_actuel: 0,
            temps_chanson: 0,
            son: 0.5,
            timeline: 0,
            show_volume: "",
        }
    },

    mounted() {

        fetch("chansons.json").then(resp => {
            resp.json().then(contenu_json => {
                this.chansons = contenu_json
            })
        })

        this.volume()

        this.audio.addEventListener("play", e => {
            this.musique_joue = true
        })

        this.audio.addEventListener("pause", e => {
            this.musique_joue = false
        })

        this.audio.addEventListener("timeupdate", e => {
            this.temps_actuel = this.audio.currentTime

            // Reprend la function tempsChanson et l'applique au audio.currentTime pour l'afficher dans le data timeline (class="temps")
            this.timeline = this.tempsChanson(Math.floor(this.audio.currentTime))

        })
    },

    methods: {

        // Affiche la chanson qui a été cliquée
        afficherChanson(chanson) {
            this.chanson_selection = chanson

            /**
             * Lorsque une chanson est affichée, musique_joue est à false afin que le bouton play soit visible.
             */
            this.musique_joue = false

            /**
             * place dans la source audio le current_src
             * qui contient src-> "songs/" et la chanson en lecture (chanson.audio)
             **/
            let current_src = "songs/" + chanson.audio
            this.audio.setAttribute("src", current_src)
        },

        //Temps des chansons converties
        tempsChanson(chanson) {

            /**
             * Le temps des chansons qui est converti en minute et auquel on ajoute (s) les secondes restantes
             */
            let secondes = chanson
            let minutes = Math.floor(secondes / 60)
            let s = secondes % 60

            // On ajoute 0 si le restant est plus petit que 10, sinon on enlève le 0.
            if (s < 10) {
                return minutes + ":" + 0 + s
            } else {
                return minutes + ":" + s
            }
        },

        //Barre de recherche
        rechercheChansons(chanson) {

            /**
             * Si ce que l'on écrit dans la barre de recherche (this.text_input)
             * est contenu dans le titre, l'artiste ou le tags de l'une ou l'autre des chansons, alors on applique le filtre qui sélectionne ces chansons.
             */
            if (chanson.titre.toLowerCase().includes(this.texte_input) ||
                chanson.artiste.toLowerCase().includes(this.texte_input) ||
                chanson.tags.includes(this.texte_input)
            ) {
                return true
            }
            return false
        },

        // Permet d'afficher dans la barre de recherche, le tag sur lequel on click
        rechercheParTag(tag) {
            /**
             * Lorsque l'on click sur un tag, le texte s'écrit dans le champs de recherche
             */
            this.texte_input = tag
        },

        // au click sur bouton play, la musique débute et musique_joue devient false, ce qui affiche bouton pause et vice/versa.
        play() {
            this.audio.play()
        },

        pause() {
            this.audio.pause()
        },

        //volume de la chanson en cours
        volume() {
            /**
             * Je place audio.volume dans le data son
             * afin d'effectuer un calcul dessus et 
             * de l'utiliser dans mon v-model (class="volume")
             */
            this.audio.volume = this.son
            this.show_volume = "(" + Math.round(this.son * 100) + "%)"
        }

    },
})