var loadLocalStorage = function () {
	var keys = Object.keys(localStorage)
	var htmlString = '';
	for (var i = 0; i < keys.length; i++) {
		htmlString += `<tr ><td class="entry" id="${keys[i]}">${keys[i]}</td><td>` + JSON.parse(localStorage.getItem(keys[i]))[1] + '</tr></tr>';
	}
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

function buttonFunctionality(){

	//detects key input and adjusts the update/create button as its needed
		$('#key').on('input',function(e){
    		var key = $('#key').val();
    		var keyExists = (localStorage.getItem(key)!==null);
    		if(keyExists){
    			$("#all-buttons").html(`<button class='button' id='btn-update' type='button'>Update</button> 
    			<button class='button' id='btn-delete' type='button'>Delete</button>`);
    			buttonFunctionality();
    		}else{
    			if($("#btn-update")){
    				$("#all-buttons").html(`<button class="button" id="btn-create" type="button">Create</button> 
    				<button class='button' id='btn-delete' type='button'>Delete</button>`);
    				buttonFunctionality();
    			}
    		}
		});

	//detects key input in the value field and makes sure to create an update button. This is only useful for a newly created key
	//any other circumstances should be caught by the $(#KEY).on(input) code above^^
		$('#value').on('input',function(e){
    		var key = $('#key').val();
    		var keyExists = (localStorage.getItem(key)!==null);
    		if(keyExists){
    			$("#all-buttons").html(`<button class='button' id='btn-update' type='button'>Update</button> 
    			<button class='button' id='btn-delete' type='button'>Delete</button>`);
    			buttonFunctionality();
    		}
    	});


		$('#btn-create').on('click', function(e) {
			var key = $('#key').val();
			var value = $('#value').val();
			var keyExists = localStorage.getItem(key) !== null;

			if (keyExists) {
				updateStatusLabel('key already exists, please use update button instead! :D');
			} else if (key === '') {
				updateStatusLabel('invalid input!')
			}else {
				createEntry(key, JSON.stringify([value, Date()]));
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
		});	
};

function tableFunctionality(){
	$(".entry").on("click", function e(){
		$("#contentWindow").html("Title : " + event.target.id + "<br>" + JSON.parse(localStorage.getItem(event.target.id))[0]);
	})
}

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function readyFunc() {
	loadLocalStorage();
	buttonFunctionality();
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
