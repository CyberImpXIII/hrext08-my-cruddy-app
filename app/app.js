var loadLocalStorage = function () {
	var localStorageEntries = Object.entries(localStorage)
	var htmlString = '';
	var sortedStorage = [];
	for (var i = 0; i < localStorageEntries.length; i++){
		sortedStorage.push(JSON.parse(localStorageEntries[i][1]));
		sortedStorage[i].unshift(localStorageEntries[i][0])
	}
	sortedStorage.sort(function(a,b){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  	return  new Date(b[2]) - new Date(a[2]);
});
	for (var i = 0; i < sortedStorage.length; i++) {
		htmlString += '<tr ><td class="entry" id="' + sortedStorage[i][0] + '">' + sortedStorage[i][0] + '</td><td>' 
		+ sortedStorage[i][2] + '</tr></tr>';
	}
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

function buttonAvailabilityChecker(){
		var key = $('#key').val();
		var keyExists = (localStorage.getItem(key)!==null);
		if(keyExists){
	    	$("#all-buttons").html(`<button class='button' id='btn-update' type='button'>Update</button> 
	    		<button class='button' id='btn-delete' type='button'>Delete</button>`);
	    }else{
	    	if($("#btn-update")){
	    		$("#all-buttons").html(`<button class="button" id="btn-create" type="button">Create</button> 
	    			<button class='button' id='btn-delete' type='button'>Delete</button>`);
	    	}
	    }
	}

function formFunction(){
	//detects key input and adjusts the update/create button as its needed
	$('#key').on('input',function(e){
		buttonAvailabilityChecker();
		buttonFunctionality();
	});

	//detects key input in the value field and makes sure to create an update button. This is only useful for a newly created key
	//any other circumstances should be caught by the $(#KEY).on(input) code above^^
	$('#value').on('input',function(e){
		buttonAvailabilityChecker();
		buttonFunctionality();
    });
}

function buttonFunctionality(){


		$('#btn-create').on('click', function(e) {
			var key = $('#key').val();
			var value = $('#value').val();
			var keyExists = localStorage.getItem(key) !== null;

			if (keyExists) {
				updateStatusLabel('key already exists, please use update button instead! :D');
			} else if (key === '') {
				updateStatusLabel('invalid input!')
			}else {
				createEntry(key, JSON.stringify([value, Date(), Date()]));
				updateStatusLabel('key created - ' + key);
			}
			$("#contentWindow").html("Title : " + key + "<br>" + JSON.parse(localStorage.getItem(key))[0]);

			loadLocalStorage();
		});

		$('#btn-update').on('click', function(e) {
			var key = $('#key').val();
			var value = $('#value').val();
			var existingValue = localStorage.getItem(key)
			var keyExists = existingValue !== null;

			if (value === existingValue) {
				updateStatusLabel('key not updated - that value already exists silly! xD')
			} else if (keyExists) {
				updateEntry(key, JSON.stringify([value, Date(), JSON.parse(localStorage.getItem(key))[1]]));
				updateStatusLabel('key updated - ' + key);
			} else if (key === '') {
				updateStatusLabel('invalid input!')
			} else {
				updateStatusLabel('key doesn\'t exist, please use create button instead! :D');
			}		
			$("#contentWindow").html("Title : " + key + "<br>" + JSON.parse(localStorage.getItem(key))[0]);
			
			loadLocalStorage();		
		});

		$('#btn-delete').on('click', function(e) {
			var key = $('#key').val();
			var value = $('#value').val();
			var keyExists = localStorage.getItem(key) !== null;

			if (keyExists) {
				removeEntry(key);
				updateStatusLabel('key removed - ' + key);
			} else if (key === '') {
				updateStatusLabel('invalid input!')
			} else {
				updateStatusLabel('key doesn\'t exist, nothing removed. :|');
			}

			if($("#btn-update")){
    			$("#all-buttons").html(`<button class="button" id="btn-create" type="button">Create</button> 
    			<button class='button' id='btn-delete' type='button'>Delete</button>`);
    			buttonFunctionality();
    		}
			loadLocalStorage();
			$('#key').val("");
			$('#value').val("");
			tableFunctionality();
		});	
};

function tableFunctionality(){
	$(".entry").on("click", function e(){
		var key = JSON.stringify(event.target.id)
		key = key.split("");
		key.shift();
		key.pop();
		key = key.join("");
		$('#key').val(key);
		$('#value').val(JSON.parse(localStorage.getItem(key))[0]);
		$("#contentWindow").html("<div id = 'content-window-title'>Title : " + event.target.id
			+ "</div><div id='content-window-date-updated'>" + JSON.parse(localStorage.getItem(key))[0] + "</div><div id='content-window-date-created'><br>"
			+ JSON.parse(localStorage.getItem(event.target.id))[0]);
	})
}

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function readyFunc() {
	loadLocalStorage();
	buttonFunctionality();
	formFunction();
	tableFunctionality();
});
/*



When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}
