(function () {
	if(window.webkitNotifications) {
		var nots = []
		,	blurred = false
		,	go = function () {
			var not = function(title, msg) {
				if(isVisible()) {
					var icon = "http://talkerapp.com/images/logo.png";
					return window.webkitNotifications.createNotification(icon, title, msg);
				}
			}
			,	handle = function(e) {
				var x = not(e.user.name, e.content)
				if(x) {
					nots.forEach(function (v) {
						v.cancel();
					});
					nots = [];
					x.onclick = function () {
						window.focus();
						this.cancel();
						Talker.getMessageBox().focus();
					}
					nots.push(x);
					x.show();
				}
			}
			,	isVisible = function() {
				return document.webkitHidden || blurred;
			}

			$(window).blur(function () {
				blurred = true;
			}).focus(function () {
				blurred = false;
			});

			plugin.onJoin = plugin.onLeave = plugin.onMessageReceived = handle;
		}
		,	checkPerms = function() {
			if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
				go();
				Talker.getMessageBox().unbind('keypress', checkPerms);
				return true;
			}
			else {
				window.webkitNotifications.requestPermission(go);
			}

			Talker.getMessageBox().unbind('keypress', checkPerms);
			return false;
		}

		if(!checkPerms()) {
			Talker.getMessageBox().bind('keypress', checkPerms);
		}
	}
})();

