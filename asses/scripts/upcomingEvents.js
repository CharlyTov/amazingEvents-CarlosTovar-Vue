//metodo funcion
const { createApp } = Vue;

//inicia con un objeto como argumento
createApp({
    data() {
        return {
            // propiedades reactivas
            events: [],
            current: "",
            arrayCategories: [],
            categoriesChecked: [],
            inputSearch: "",
            filterCrossed: [],
            upComingEvents: [],
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((data) => data.json())
            .then((data) => {
                this.events = data.events;
                this.arrayCategories = [...new Set(this.events.map((event) => event.category))];
                this.current = data.currentDate
                this.upComingEvents = this.events.filter(event => event.date >= this.current)
            })
            .catch((error) => console.error(error.message));
    },
    computed: {
        filterValue() {
            this.filterCrossed = this.upComingEvents.filter(event => {
                return event.name.toLowerCase().includes(this.inputSearch.toLowerCase()) && (this.categoriesChecked.includes(event.category) || this.categoriesChecked.length == 0)
            })
        }
    },
}).mount("#app");//montar mi app vue sobre el id app