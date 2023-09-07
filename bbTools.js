function bbQuote(text, userName, msgId)
	{
		return '[quote='+userName+' message='+msgId+']' + text + '[/quote]' + "\n";
	}

function bbContent(el, skip = 0)
	{
		var src = '', skipped = 0;
		for (var child of el.childNodes)
			if (skipped++ >= skip)
				{
					src += bbCode(child, true);
				}
		return src;
	}

function bbCode(el, sub)
	{

		if (!sub) return bbContent(el);

		if (el.nodeType == el.TEXT_NODE)
			{
				var str = el.nodeValue;
				return (str === undefined) ? '' : str;
			}

		if (el.nodeType == el.ELEMENT_NODE)
			{

				_tagName = el.tagName.toLowerCase();

				if (el.className == 'quotetext')
					{
						return bbQuote(bbContent(el, 2),
											el.getAttribute('data-user'), el.getAttribute('data-id'));
					}

				if (el.className == 'spoiler')
					{
						var button = el.querySelector('input[type=button]');
						var name = button.getAttribute('data-showname').replace(/^Show /, '');
						var content = el.querySelector('.spoiler_content');
						return '[spoiler="'+name+'"]' + bbContent(content) + '[/spoiler]';
					}

				if (_tagName == 'a')
					{
						return '[url=' + el.href + ']' + bbContent(el) + '[/url]';
					}

				if (_tagName == 'img')
					{
						return '[img]'+el.src+'[/img]';
					}

				if (_tagName == 'br')
					{
						// return "\n";
					}

				if (_tagName == 'iframe' && el.className.match('youtube'))
					{
						var r = el.src.match(/embed\/([a-zA-Z]+)/);
						var code = r[1];
						return '[yt]' + code + '[/yt]';
					}

				if (el.getAttribute('style') == 'text-decoration:line-through;')
					{
						return '[s]' + bbContent(el) + '[/s]';
					}

				if (el.getAttribute('style'))
					{
						var r = el.getAttribute('style').match(/^font-size: (\d+)%/);
						if (r) return '[size=' + r[1] + ']' + bbContent(el) + '[/size]';

						r = el.getAttribute('style').match(/^color: ([a-zA-Z]+)/);
						if (r) return '[color=' + r[1] + ']' + bbContent(el) + '[/color]';

						r = el.getAttribute('style').match(/^font-family: ([a-zA-Z]+)/);
						if (r) return '[font=' + r[1] + ']' + bbContent(el) + '[/font]';
					}

				if (_tagName == 'tbody') return bbContent(el);

				for (var tagName of ['strong', 'b', 'i', 'u', 'sub', 'sup', 'table', 'tr', 'td'])
					if (_tagName === tagName)
						{
							debugger;
							if (tagName == 'strong') tagName = 'b';
							return '[' + tagName + ']' + bbContent(el) + '[/' + tagName + ']';
						}

			}

		return "";

	}
