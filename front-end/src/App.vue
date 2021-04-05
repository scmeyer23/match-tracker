<template>
<div id="app">
    <div class="header">
        <router-link to="/">
            <div class="logo">
                <img src="/ordinary.png">
            </div>
        </router-link>
        <div class="title">
            <h1>Match Tracker</h1>
        </div>
    </div>
  <div class="content">
    <router-view />
  </div>
    <footer>
        <br />
        <hr />
        <a href="https://github.com/scmeyer23/match-tracker" target="_blank">Github Repo</a>
    </footer>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

footer {
    padding: 20px;
}

.logo img {
    height: 50%;
    width: 50%;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  /*Background color*/
  background-color: #f1284d;
  /*Text color*/
  color: #fff;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

.footer {
    justify-content: center;
    align-content: center;
}

.add {
  padding: 20px;
  background: #f1284d;
  font-size: 16px;
  text-align: center;
  width: auto;
  display: block;
  margin: auto;
  width: 10%;
}

.footer a {
  color: #fff!important;
  text-decoration: none!important;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
