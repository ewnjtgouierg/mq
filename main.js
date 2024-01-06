var replyButton = Array.from(document.querySelectorAll('.mal-btn.primary.js-reply-start')).pop();
console.log(replyButton);
var replyContainer = Array.from(document.querySelectorAll('.topic-reply-container')).pop();
console.log(replyContainer);

for (var el of Array.from(document.querySelectorAll('.postActions')))
	{

		var button = document.createElement('button');
		button.innerText = 'Quote';
		button.style.cursor = 'pointer';

		var msg = el.parentNode;

		button.userName = msg.parentNode.parentNode.getAttribute('data-user');

		var msgTable = msg.querySelector('table.body');

		button.msgId = msgTable.id.replace('message', '');

		button.srcPost = msgTable.querySelector('td');

		button.addEventListener('click', function() {

				var code = bbCode(this.srcPost);
				code = bbQuote(code, this.userName, this.msgId);

				var replyField = replyContainer.querySelector('textarea');

				replyField.value += code;
				if (!replyField.offsetHeight)
					{
						replyContainer.className = replyContainer.className.replace(' hide', '');
						replyContainer.style.display = 'initial';
						replyButton.click();
					}

				replyField.focus();
				replyField.setSelectionRange(replyField.value.length,replyField.value.length);

			});

		var buttonsContainer = el.querySelector('.mal-btn-group');

		buttonsContainer.appendChild(button);

	}
