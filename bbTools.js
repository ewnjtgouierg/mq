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

				var _tagName = el.tagName.toLowerCase();

				if (el.className == 'quotetext')
					{
						var user = el.getAttribute('data-user');
						if (!user) return '[quote]'+bbContent(el)+'[/quote]';
						return bbQuote(bbContent(el, 2), user, el.getAttribute('data-id'));
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
						if (el.className == 'ext-emoji' && el.alt) return el.alt;
						var str = '[img';
						for (var key of ['width', 'height'])
							{
								var val = el.style[key];
								if (!val) continue;
								val = Number(val.replace(/[^\d]/g, ''));
								if (val) str += ' ' + key + '=' + val;
							}
						str += ']'+el.src+'[/img]'
						return str;
					}

				if (_tagName == 'br')
					{
						// return "\n";
					}

				if (_tagName == 'iframe' && el.className.match('youtube'))
					{
						var r = el.src.match(/embed\/([-_a-zA-Z0-9]+)/);
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

				if (_tagName === 'ul')
					return '[list]' + bbContent(el) + '[/list]';

				if (_tagName === 'li') return '[*]' + bbContent(el);

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
