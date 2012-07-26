(function () {
	if(window.webkitNotifications) {
		var go = function () {
			var not = function(title, msg) {
				if(document.webkitHidden) {
					var icon = "http://talkerapp.com/images/logo.png";
					return window.webkitNotifications.createNotification(icon, title, msg);
				}
			}
			,	handle = function(e) {
				var x = not(e.user.name, e.content)
				if(x) {
					x.onclick = function () {
						window.focus();
						this.cancel();
						Talker.getMessageBox().focus();
					}
					x.show();
				}
			}

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

