function loadScript(filename)
	{
		var s = document.createElement('script');
		s.src = chrome.runtime.getURL(filename);
		s.onload = function() {
		    this.remove();
		};
		(document.head || document.documentElement).appendChild(s);
	}

loadScript('bbTools.js');
loadScript('main.js');