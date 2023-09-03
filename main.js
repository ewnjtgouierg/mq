var replyButton = Array.from(document.querySelectorAll('.mal-btn.primary.js-reply-start')).pop();
var replyField = Array.from(document.querySelectorAll('.topic-reply-container')).pop().querySelector('textarea');

for (var el of Array.from(document.querySelectorAll('.postActions')))
	{

		var button = document.createElement('button');
		button.innerText = 'Quote';
		button.style.cursor = 'pointer';

		var msg = el.parentNode;

		var userName = msg.parentNode.parentNode.getAttribute('data-user');

		var msgTable = msg.querySelector('table.body');

		var msgIdPart = msgTable.id.replace('message', 'message=');

		var text = msgTable.querySelector('td').innerText;

		button.code = '[quote='+userName+' '+msgIdPart+']' + text + '[/quote]' + "\n";

		var buttonsContainer = el.querySelector('.mal-btn-group');

		button.addEventListener('click', function() {

				replyField.value += this.code;
				if (!replyField.offsetHeight) replyButton.click();

				replyField.focus();
				replyField.setSelectionRange(replyField.value.length,replyField.value.length);

			});

		buttonsContainer.appendChild(button);
	}
