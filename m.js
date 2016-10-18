var GSCommon = {
    makeParentOf: function (child) {
        for (var item in this) {
            child[item] = this[item];
        }
    },
    initListeners: function (namespace, exceptions) {
        var self = this;
        exceptions = exceptions || {};

        for (var method in self) {
            (function(method) {
                if (typeof self[method] !== 'function') return;
                if (!~method.indexOf('action')) return;

                var actionName = method.replace('action', '');
                actionName = actionName.charAt(0).toLowerCase() + actionName.substr(1, actionName.length - 1);

                var exception = exceptions[actionName] ? exceptions[actionName] : false;
                var eventName = 'click.gs';
                var preventDefault = true;
                if(exception !== false) {
                    if(typeof exception === 'object') {
                        eventName = exception['eventName'] + '.gs';
                        preventDefault = exception['preventDefault'];
                    } else {
                        eventName = exception + '.gs';
                    }
                }

                var selector = '.js-' + namespace + '-' + actionName;
                var handler = function(e) {
                    if(preventDefault) e.preventDefault();
                    self[method]($(this), e);
                };

                // use event namespace ".gs" to off all attached before events.. and then attache events again (to not attach an event twice)
                $(document).off('.gs', selector);
                $(document).on(eventName, selector, handler);
            })(method);
        }
    },
    notify: function (message, status, delay) {
s
    },
    loadModal: function (params) {

    }
};

var User = {
    init: function () {
        GSCommon.makeParentOf(this);
        this.initListeners('user');
    },
    actionSignIn: function (btn, e) {
        console.log(btn);
        console.log(e);
    }
};


$(function () {
    User.init();
});