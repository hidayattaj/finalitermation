let song_found = "";

let djs_array = [];
let dj_counter = 0;
let dj_name = "";
let dj_timeslot = "";

let completelist = "";
let songList = "";


let selected_dj = "";

let color = "";




document.addEventListener('click', (e) => {


  if (e.target.classList[0] === "dj1" || e.target.classList[0] === "dj2" || e.target.classList[0] === "dj3" || e.target.classList[0] === "dj4" || e.target.classList[0] === "dj5") { return; }

  if (e.target.className === "playlist-container") { return; }
  if (e.target.id === "playlist-title") { return; }
  if (e.target.className === "enter-song") { return; }
  if (e.target.className === "song-btn") { return; }
  if (e.target.id === "songs-number") { return; }
  if (e.target.className === "songs-div") { return; }
  if (e.target.className === "songs-list") { return; }
  if (e.target.className === "song-name-div") { return; }
  if (e.target.className === "song-delete-div") { return; }
  if (e.target.className === "song-delete-btn") { return; }


  
  if (document.querySelector(".dj1") != null) { document.querySelector(".dj1").style["background-color"] = "white"; }
  if (document.querySelector(".dj2") != null) { document.querySelector(".dj2").style["background-color"] = "white"; }
  if (document.querySelector(".dj3") != null) { document.querySelector(".dj3").style["background-color"] = "white"; }
  if (document.querySelector(".dj4") != null) { document.querySelector(".dj4").style["background-color"] = "white"; }
  if (document.querySelector(".dj5") != null) { document.querySelector(".dj5").style["background-color"] = "white"; }


  selected_dj = "";
  document.querySelector("#playlist-title").innerText = "-----";
  document.querySelector("#songs-number").innerText = "-----";
  document.querySelector(".songs-div").style["display"] = "none";

});







function info_entered() {

  const dj = {
    name: "",
    timeslot: "",
    songs : []
  };


  dj_name = document.querySelector(".enter-dj").value;
  dj_timeslot = document.querySelector(".enter-timeslot").value;


  for (let i = 0; i < djs_array.length; i++) {
    if (dj_name === djs_array[i].name && dj_timeslot === djs_array[i].timeslot) {
      alert("DJ already exists.")
      return;
    }
  }


  // Display error if max DJs amount have been reached.
  if (dj_counter === 5) {
    alert("Maximum DJs have been created.");
    return;
  }

  // Display error if the input field is empty.
  if (dj_name === "" || dj_timeslot === "") {
    alert("Enter all the information.");
    return;
  }

  // Display error if DJ field contains a number or special character.
  if (/[0-9 ~!@#$%^&*()_|+\-=?;:,.]/.test(dj_name)) {
    alert("DJ name cannot contain numbers or special characters.");
    return;
  }

  // Display error if timeslot field contains a string or special character.
  if (/[~!@#$%^&*()_|+\=?;,.]/.test(dj_timeslot)) {
    alert("Valid format is hh:mm am/pm.");
    return;
  }

  completelist = document.querySelector(".dj-container");
  completelist.innerHTML += "<div class= dj"+`${dj_counter+1}`+" onclick=select_dj(this)>"+dj_name+"</div><div><button class='delete-btn' onclick='delete_dj(this)'>Delete</button></div>";

  dj.name = dj_name;
  dj.timeslot = dj_timeslot;

  djs_array.push(dj);

  dj_counter++;
}

function delete_dj(element) {
  for (let i = 0; i < djs_array.length; i++) {
    if (element.parentNode.previousSibling.innerText === djs_array[i].name) {
      djs_array.splice(i, 1);
    }
  }
  element.parentNode.previousSibling.remove();
  element.parentNode.remove();
  dj_counter--;
}

/* ===================================================================================================== */
/* ===================================================================================================== */
/* ===================================================================================================== */
/* ===================================================================================================== */



function select_dj(element) {

  
  if (color != "") {
    if (document.querySelector(`.${color}`) != null) {
      document.querySelector(`.${color}`).style["background-color"] = "white";
    }
  }

  let i = 0;
  for (; i < djs_array.length; i++) {
    if (element.innerText === djs_array[i].name) {
      selected_dj = djs_array[i];
      break;
    }
  }

  document.querySelector("#playlist-title").innerText = djs_array[i].name + "'s Playlist";
  document.querySelector("#songs-number").innerText = djs_array[i].name + " has " + djs_array[i].songs.length + " songs in playlist.";

  


  if (element.className === "dj1") { 
    document.querySelector(".dj1").style["background-color"] = "#3498db";
    display_songs(djs_array[i]);
   }



  if (element.className === "dj2") { 
    document.querySelector(".dj2").style["background-color"] = "#3498db"; 
    display_songs(djs_array[i]);
  }
  if (element.className === "dj3") { 
    document.querySelector(".dj3").style["background-color"] = "#3498db"; 
    display_songs(djs_array[i]);
  }
  if (element.className === "dj4") { 
    document.querySelector(".dj4").style["background-color"] = "#3498db"; 
    display_songs(djs_array[i]);
  }
  if (element.className === "dj5") { 
    document.querySelector(".dj5").style["background-color"] = "#3498db"; 
    display_songs(djs_array[i]);
  }

  color = element.className;

}

/* ===================================================================================================== */
/* ===================================================================================================== */
/* ===================================================================================================== */
/* ===================================================================================================== */


function song_entered(element) {

  let payload = document.querySelector(".enter-song").value;

  if (payload === "") {
    alert("Please enter a song.");
    return;
  }

  if (selected_dj === "") {
    alert("Please select DJ first.");
    return;
  }



  const pay = {
    title: payload
  };

  fetch("/producer", { method: "POST", body: JSON.stringify(pay), headers: {'Content-Type': 'application/json'} })
  .then(function(response) {
    if(response.ok) return response.json();
  })
  .then(function(data) {
    song_found = data;
  })
  .then(function() {

    if (song_found === "not_found") {
      alert("Song is not in the database. Try different song.");
      return;
    }

    let i = 0;
    for (; i < djs_array.length; i++) {
      if (selected_dj.name === djs_array[i].name) {
        if (djs_array[i].songs.includes(song_found.title)) {
          alert("Song is already in the playist.");
          return;
        }
        djs_array[i].songs.push(song_found.title);
        break;
      }
    }

  document.querySelector("#songs-number").innerText = djs_array[i].name + " has " + djs_array[i].songs.length + " songs in playlist.";

  document.querySelector(".songs-div").style["display"] = "block";

  songList = document.querySelector(".songs-div");
  songList.innerHTML += "<li class='songs-list'><div class='song-name-div'>" + song_found.title + "</div><div class='song-delete-div'><button class='song-delete-btn' onclick='delete_song(this)'>Delete</button></div></li>";

  })


}

function display_songs(dj) {
  document.querySelector(".songs-div").style["display"] = "block";
  songList = document.querySelector(".songs-div");
  let songs = dj.songs;

  // Logic for removing the child nodes
  let childs_length = songList.childNodes.length;
  for (let j = 0; j < childs_length; j++) {
    songList.removeChild(songList.childNodes[0]);
  }

  // Inserts new html element based on the songs in the dj's array
  for (let i = 0; i < songs.length; i++) {
    songList.innerHTML += "<li class='songs-list'><div class='song-name-div'>" + songs[i] + "</div><div class='song-delete-div'><button class='song-delete-btn' onclick='delete_song(this)'>Delete</button></div></li>";
  }
}



function delete_song(element) {

  let song_name = element.parentNode.previousSibling.innerText;
  let temp = element.parentNode.parentNode;

  for (let i = 0; i < djs_array.length; i++) {
    if (selected_dj.name === djs_array[i].name) {
      if (djs_array[i].songs.includes(song_name)) {
          let index = djs_array[i].songs.indexOf(song_name);
          djs_array[i].songs.splice(index, 1);
          document.querySelector("#songs-number").innerText = djs_array[i].name + " has " + djs_array[i].songs.length + " songs in playlist.";
      }
    }
  }

  temp.remove();
}