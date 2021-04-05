<template>
    <div class="admin">
        <h1>Add Your Matches Here!</h1>
        <div class="add">
            <div class="form">
                <input v-model="title" placeholder="Title">
                <p></p>
                <input v-model="opponent" placeholder="Opponent(s)">
                <p></p>
                <input v-model="score" placeholder="Score (e.g. 6-0;6-0)">
                <p></p>
                <form>
                    <input type="radio" name="Win" />
                    <label for="win">Win</label>
                    <input type="radio" name="Win" />
                    <label for="Loss">Loss</label>
                </form>
                <p></p>
                <input v-model="date" placeholder="Date (e.g. April 20, 2021)">
                <p></p>
                <textarea v-model="notes" placeholder="Additional notes (partner name, surface type, etc.)"></textarea>
                <p></p>
                <select id="select" v-model="type">
                    <option value="Singles-Tournament">Singles Tournament</option>
                    <option value="Singles-Challenge-Match">Singles Challenge Match</option>
                    <option value="Doubles-Tournament">Doubles Tournament</option>
                    <option value="Doubles-Challenge-Match">Doubles Challenge Match</option>
                    <option value="Other">Other</option>
                </select>
                <p></p>
                <button class="add-data" @click="add">Add Match Data</button>
            </div>
        </div>
        <div class="upload" v-if="addItem">
            <h1>Match Summary</h1>
            <h2>{{addItem.title}} against {{addItem.opponent}} on {{addItem.date}}.</h2>
            <h2 v-show="this.subWin === true">You won by a score of {{addItem.score}}.</h2>
            <h2 v-show="this.subWin === false">You lost by a score of {{addItem.score}}.</h2>
            <h2>Here are your additional notes: {{addItem.notes}}.</h2>
        </div>
    </div>
</template>

<style scoped>
    .add-data {
        width: 200px;
    }

    .add,
    .edit {
        display: block;
        float: left;
        width: auto;
    }

    .upload {
        display: block;
        float: right;
        width: auto;
    }

    /* Form */
    input,
    textarea,
    select,
    button {
        font-family: 'Montserrat', sans-serif;
        font-size: 1em;
    }

    .form {
        width: 40%;
        margin-right: 50px;
    }
</style>

<script>
    import axios from 'axios';
    export default {
        name: 'Admin',
        data() {
            return {
                title: "",
                opponent: "",
                score: "",
                date: "",
                notes: "",
                type: "",
                win: null,
                subWin: null,
            }
        },
        created() {
            this.getCategories();
        },
        methods: {
            isWin() {
                var ele = document.getElementsByName('Win');
                if (ele[1].checked) {
                    return false;
                }
                return true;
            },
            clearWin() {
                var ele = document.getElementsByName('Win');
                for (var i = 0; i < ele.length; ++i) {
                    ele[i].checked = false;
                }
                var ele2 = document.getElementById('select');
                ele2.selectedIndex = -1;

            },
            async add() {
                try {
                    let r2 = await axios.post('/api/cat/' + this.type + '/match', {
                        title: this.title,
                        opponent: this.opponent,
                        score: this.score,
                        date: this.date,
                        notes: this.notes,
                        win: this.isWin(),
                    });
                    this.subWin = this.isWin();
                    this.addItem = r2.data;
                    this.title = "";
                    this.opponent = "";
                    this.score = "";
                    this.date = "";
                    this.notes = "";
                    this.clearWin();
                } catch (error) {
                    console.log(error);
                }
            },
            async getCategories() {
                try {
                    const response = await axios.get("/api/cat");
                    this.projects = response.data;
                } catch (error) {
                    console.log(error);
                }
            },

        }
    }
</script>