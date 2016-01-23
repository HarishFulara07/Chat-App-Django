var do_scroll = true;

$('#chat-form').on('submit', function(event){
	event.preventDefault();

	$.ajax({
		url : '/post/',
		type : 'POST',
		data : { msgbox : $('#chat-msg').val() },

		success : function(json){
			$('#chat-msg').val('');
			$('#send').attr('disabled', true);
			$('#msg-list').append('<li class="text-right list-group-item">' + json.msg + '</li>');
			if(do_scroll)
			{
				var chatlist = document.getElementById('msg-list-div');
				chatlist.scrollTop = chatlist.scrollHeight;
				//console.log(chatlist.scrollTop + " " + chatlist.scrollHeight);	
			}
		}
	});
});

function getMessages(){
	$.get('/messages/', function(messages){
		$('#msg-list').html(messages);
		if(do_scroll)
		{
			var chatlist = document.getElementById('msg-list-div');
			chatlist.scrollTop = chatlist.scrollHeight;
			//console.log(chatlist.scrollTop + " " + chatlist.scrollHeight);
		}
	});
}

$(function(){
	$('#msg-list-div').on('scroll', function(){
		var chatlist = document.getElementById('msg-list-div');
		//console.log(chatlist.scrollTop + " " + chatlist.scrollHeight);
		if(chatlist.scrollHeight - chatlist.scrollTop <= 575)
		{
			do_scroll = true;
		}
		else
		{
			do_scroll = false;
		}
	});
	refreshTimer = setInterval(getMessages, 1000);
});

$(document).ready(function() {
	$('#chat-msg').keyup(function() {
		if($(this).val() != '') {
			$('#send').attr('disabled', false);
		}
	});
});

// using jQuery
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
// Does this cookie string begin with the name we want?
if (cookie.substring(0, name.length + 1) == (name + '=')) {
	cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	break;
}
}
}
return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
// these HTTP methods do not require CSRF protection
return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
	beforeSend: function(xhr, settings) {
		if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		}
	}
});