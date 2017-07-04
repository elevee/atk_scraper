var ENV   =  require('./env.js');
var cheerioReq = require("cheerio-req");
// var url = "https://www.americastestkitchen.com/recipes/9067-scallion-pancakes-with-dipping-sauce";
var Evernote = require('evernote');

var developerToken = ENV["EVERNOTE_DEV_TOKEN"]; //https://sandbox.evernote.com/shard/s1/notestore
// var client = new Evernote.Client({
//   token: developerToken, 
//   sandbox: false, 
//   china: false
// });

// console.log(client.getNoteStore());

var noteStore = client.getNoteStore();
noteStore.listNotebooks().then(function(notebooks){
  for (var i in notebooks) {
    console.log("Notebook: " + notebooks[i].name);
  }
});
// console.log(noteStore.listNotebooks(developerToken));

module.exports = {
  // developerToken: ENV["EVERNOTE_DEV_TOKEN"], //https://sandbox.evernote.com/shard/s1/notestore

  // noteStore: client.getNoteStore(),

  testFunc: function(note){
    console.log(note.title);
    noteStore.listNotebooks().then(function(notebooks){
      for (var i in notebooks) {
        console.log("Notebook: " + notebooks[i].name);
      }
    });
    // var nbs = noteStore.listNotebooks(developerToken);
    // console.log(nbs);
    // for (var i in noteStore) {
    //     console.log("Notebook: " + noteStore[i]);
    // }
    // .then(function(notebooks) {
    //   console.log(notebooks);
    //   for (var i in notebooks) {
    //     // console.log("Notebook: " + notebooks[i].name);
    //   }
    // });
  },

  makeNote: function(noteTitle, noteBody, parentNotebook, callback) {
    var nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
    nBody += "<en-note>" + noteBody + "</en-note>";
   
    // Create note object
    var ourNote = new Evernote.Note();
    ourNote.title = noteTitle;
    ourNote.content = nBody;
   
    // parentNotebook is optional; if omitted, default notebook is used
    if (parentNotebook && parentNotebook.guid) {
      ourNote.notebookGuid = parentNotebook.guid;
    }
   
    // Attempt to create note in Evernote account
    noteStore.createNote(ourNote, function(err, note) {
      if (err) {
        // Something was wrong with the note data
        // See EDAMErrorCode enumeration for error code explanation
        // http://dev.evernote.com/documentation/reference/Errors.html#Enum_EDAMErrorCode
        console.log(err);
      } else {
        callback(note);
      }
    });
   
  }
};

// var noteStore = client.getNoteStore();

// noteStore.listNotebooks().then(function(notebooks) {
//   //   console.log(notebooks);
//   for (var i in notebooks) {
//     // console.log("Notebook: " + notebooks[i].name);
//   }
// });

// cheerioReq(url, (err, $) => {
//     var $recipe = $(".recipe-detail");
//     var $ingredients = $recipe.find(".recipe__ingredients");
//     var $instructions = $recipe.find(".recipe__instructions");
//     for (var i = 0; i < $recipe.length; ++i) {
//         // console.log($recipe.eq(i).text());
//     }
//     // =>
//     console.log($instructions.text());
// });

