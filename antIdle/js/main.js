// For an introduction to the Blank template, see the following documentation:
// https://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
    var isFirstActivation = true;
    var myUI;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
			// this is a good place to decide whether to populate an input field or choose a different initial view.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// A Launch activation happens when the user launches your app via the tile
			// or invokes a toast notification by clicking or tapping on the body.
			if (args.detail.arguments) {
				// TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
				// to take the user in response to them invoking a toast notification.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: This application had been suspended and was then terminated to reclaim memory.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
				// Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
			// In that case it would be suspended shortly thereafter.
			// Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
			// should be done here (to avoid doing them in the prelaunch case).
			// Alternatively, this work can be done in a resume or visibilitychanged handler.
		}

		if (isFirstActivation) {
			// TODO: The app was activated and had not been running. Do general startup initialization here.
			document.addEventListener("visibilitychange", onVisibilityChanged);
            args.setPromise(WinJS.UI.processAll());
            myUI.init();
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: The app just became visible. This may be a good time to refresh the view.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};
    myUI = {
        /* return functions */
        createEle: (x) => { return document.createElement(x); },
        bySel: (x) => { return document.querySelector(x); },
        bySelAll: (x) => { return document.querySelectorAll(x) },
        byTag: (x, y) => { return document.getElementsByTagName(x)[y]; },

        /* primary app functions */
        init: () => {
            var uFrame = myUI.createEle("div"),
                stats = myUI.createEle("div"),
                controls = myUI.createEle("div");

            controls.innerHTML = "";
            controls.className = "controls";
            for (var i = 1; i < 6; i++) {
                var btns = myUI.createEle("button");

                btns.innerHTML = "btns" + i;
                btns.className = "cntrlBtns";
                controls.appendChild(btns);
            }

            stats.innerHTML = "";
            stats.className = "stats";
            for (var i = 1; i < 6; i++) {
                var sts = myUI.createEle("div");

                sts.innerHTML = i;
                sts.className = "sts";
                stats.appendChild(sts);
            }

            uFrame.innerHTML = "";
            uFrame.className = "uFrame_pre";
            uFrame.appendChild(controls);
            uFrame.appendChild(stats);

            dvContain.appendChild(uFrame);

            setTimeout(() => {
                uFrame.className = "uFrame_full";
            }, 500);
        }

        /* main scope */

        /* settings and options */

        /* admin functions */
    }

	app.start();

})();
