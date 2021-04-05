<template>
    <div class="home">
        <div class="main">
            <div class="matches">
                <h1>Singles Tournament Matches</h1>
                <div class="extra"></div>
                <div class="extra2"></div>
                <h3 v-show="this.stmatches.length === 0">You don't have any Singles Tournament Matches currently added. Click the "Add Matches" button below to start adding matches.</h3>
                <div class="info" v-for="match in stmatches" :key="match._id">
                    <div class="edit-delete">
                        <button class="edit" @click="edit(match)">Edit</button>
                        <button class="delete" @click="remove(match)">X</button>
                    </div>
                    <h2 class="sum">{{match.title}} Summary</h2>
                    <h2 v-if="match.win">You beat {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2 v-if="!match.win">You lost to {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2>Here are your additional notes: {{match.notes}}.</h2>
                </div>
            </div>

            <br />
            <hr />
            <div class="matches">
                <h1>Doubles Tournament Matches</h1>
                <div class="extra"></div>
                <div class="extra2"></div>
                <h3 v-show="this.dtmatches.length === 0">You don't have any Doubles Tournament Matches currently added. Click the "Add Matches" button below to start adding matches.</h3>
                <div class="info" v-for="match in dtmatches" :key="match._id">
                    <div class="edit-delete">
                        <button class="edit" @click="edit(match)">Edit</button>
                        <button class="delete" @click="remove(match)">X</button>
                    </div>
                    <h2 class="sum">{{match.title}} Summary</h2>
                    <h2 v-if="match.win">You beat {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2 v-if="!match.win">You lost to {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2>Here are your additional notes: {{match.notes}}.</h2>

                </div>
            </div>
            <br />
            <hr />
            <div class="matches">
                <h1>Singles Challenge Matches</h1>
                <div class="extra"></div>
                <div class="extra2"></div>
                <h3 v-show="this.scmatches.length === 0">You don't have any Singles Challenge Matches currently added. Click the "Add Matches" button below to start adding matches.</h3>
                <div class="info" v-for="match in scmatches" :key="match._id">
                    <div class="edit-delete">
                        <button class="edit" @click="edit(match)">Edit</button>
                        <button class="delete" @click="remove(match)">X</button>
                    </div>
                    <h2 class="sum">{{match.title}} Summary</h2>
                    <h2 v-if="match.win">You beat {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2 v-if="!match.win">You lost to {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2>Here are your additional notes: {{match.notes}}.</h2>
                </div>
            </div>

            <br />
            <hr />
            <div class="matches">
                <h1>Doubles Challenge Matches</h1>
                <div class="extra"></div>
                <div class="extra2"></div>
                <h3 v-show="this.dcmatches.length === 0">You don't have any Doubles Challenge Matches currently added. Click the "Add Matches" button below to start adding matches.</h3>
                <div class="info" v-for="match in dcmatches" :key="match._id">
                    <div class="edit-delete">
                        <button class="edit" @click="edit(match)">Edit</button>
                        <button class="delete" @click="remove(match)">X</button>
                    </div>
                    <h2 class="sum">{{match.title}} Summary</h2>
                    <h2 v-if="match.win">You beat {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2 v-if="!match.win">You lost to {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2>Here are your additional notes: {{match.notes}}.</h2>

                </div>
            </div>
            <br />
            <hr />
            <div class="matches">
                <h1>Other Matches</h1>
                <div class="extra"></div>
                <div class="extra2"></div>
                <h3 v-show="this.omatches.length === 0">You don't have any Other Matches currently added. Click the "Add Matches" button below to start adding matches.</h3>
                <div class=info v-for="match in omatches" :key="match._id">
                    <div class="edit-delete">
                        <button class="edit" @click="edit(match)">Edit</button>
                        <button class="delete" @click="remove(match)">X</button>
                    </div>
                    <h2 class="sum">{{match.title}} Summary</h2>
                    <h2 v-if="match.win">You beat {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2 v-if="!match.win">You lost to {{match.opponent}} {{match.score}} on {{match.date}}.</h2>
                    <h2>Here are your additional notes: {{match.notes}}.</h2>
                </div>
            </div>
            <br />
            <hr />
        </div>
        <div class="editing">
            <div v-if="this.isEdit">
                <div class="form">
                    <input v-model="tempTitle" placeholder="Title">
                    <p></p>
                    <input v-model="tempOpponent" placeholder="Opponent(s)">
                    <p></p>
                    <input v-model="tempScore" placeholder="Score (e.g. 6-0;6-0)">
                    <p></p>
                    <form>
                        <input type="radio" name="Win" id="winradio" />
                        <label for="win">Win</label>
                        <input type="radio" name="Win" id="loseradio" />
                        <label for="Loss">Loss</label>
                    </form>
                    <p></p>
                    <input v-model="tempDate" placeholder="Date (e.g. April 20, 2021)">
                    <p></p>
                    <textarea v-model="tempNotes" placeholder="Additional notes (partner name, surface type, etc.)"></textarea>
                    <p></p>
                    <button class="add-data" @click="update">Update Match Data</button>
                    <button class="add-data" @click="close">Close</button>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="add">
                <router-link to="/admin">Add Matches</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Home',
        data() {
            return {
                cats: [],
                stmatches: [],
                dtmatches: [],
                scmatches: [],
                dcmatches: [],
                omatches: [],
                allmatches: [],
                editMatch: null,
                isEdit: false,
                tempTitle: "",
                tempOpponent: "",
                tempScore: "",
                tempDate: "",
                tempNotes: "",
            }
        },
        created() {
            this.getCats();
            this.getMatches();
        },
        methods: {
            async getCats() {
                try {
                    const response = await axios.get("/api/cat");
                    this.cats = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async getMatches() {
                try {
                    const response = await axios.get("/api/cat/Singles-Tournament/match");
                    this.stmatches = response.data;
                    const response2 = await axios.get("/api/cat/Doubles-Tournament/match");
                    this.dtmatches = response2.data;
                    const response3 = await axios.get("/api/cat/Singles-Challenge-Match/match");
                    this.scmatches = response3.data;
                    const response4 = await axios.get("/api/cat/Doubles-Challenge-Match/match");
                    this.dcmatches = response4.data;
                    const response5 = await axios.get("/api/cat/Other/match");
                    this.omatches = response5.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async remove(match) {
                try {
                    let cat = match.category;
                    await axios.delete('/api/cat/' + cat + '/match/' + match._id);
                    this.getMatches();
                } catch (error) {
                    console.log(error);
                }
            },
            async edit(match) {
                try {
                    this.editMatch = match;
                    this.isEdit = true;
                    this.tempTitle = match.title;
                    this.tempOpponent = match.opponent;
                    this.tempScore = match.score;
                    this.tempDate = match.date;
                    this.tempNotes = match.notes;
                    if (match.win) {
                        document.getElementById("winradio").checked = true;
                    }
                    else {
                        document.getElementById("loseradio").checked = true;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async update() {
                try {
                    await axios.put('/api/cat/' + this.editMatch.type + '/match/' + this.editMatch._id, {
                        title: this.tempTitle,
                        opponent: this.tempOpponent,
                        score: this.tempScore,
                        date: this.tempDate,
                        notes: this.tempNotes,
                        win: document.getElementById("winradio").checked,
                    });
                    this.tempTitle = "";
                    this.tempOpponent = "";
                    this.tempScore = "";
                    this.tempDate = "";
                    this.tempNotes = "";
                    this.close();
                    this.getMatches();
                } catch (error) {
                    console.log(error);
                }
            },
            async close() {
                this.isEdit = false;
            }
        }
    }
</script>

<style>
    .sidebar {
    }

    .matches {
        display: grid;
        grid-template: auto auto auto / 1fr 1fr 1fr;
    }

    .info {
        border: solid;
        border-color: #f1284d;
        padding: 10px;
        margin: 10px;
    }

    h1 {
        font-style: italic;
        font-weight: bolder;
    }

    .sum {
        text-decoration: underline;
    }

    .edit-delete {
        float: right;
    }

    .home {
        display: grid;
        grid-template: auto auto /3fr 1fr;
    }

    .editing {
        padding: 20px;
        background: #f1284d;
        font-size: 16px;
        text-align: center;
        width: auto;
        display: block;
        margin: auto;
    }

    @media (max-width: 1200px) {
        .matches {
            grid-template: auto auto / 1fr 1fr;
        }

        .extra {
            display: none;
        }

        .content {
            padding: 5%;
        }
    }

    @media (max-width: 700px) {
        .matches {
            grid-template: auto / 1fr;
        }

        .extra2 {
            display: none;
        }

        .content {
            padding: 2.5%;
        }
    }
</style>