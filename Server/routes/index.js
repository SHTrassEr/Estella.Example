(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function index(req, res) {
        res.render('index', { title: 'Express', year: new Date().getFullYear() });
    }
    exports.index = index;
    ;
    function about(req, res) {
        res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
    }
    exports.about = about;
    ;
    function contact(req, res) {
        res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
    }
    exports.contact = contact;
    ;
    function tanks(req, res) {
        res.render('tanks', { title: 'Tanks', year: new Date().getFullYear(), message: 'Tanks' });
    }
    exports.tanks = tanks;
    ;
    function king(req, res) {
        res.render('king', { title: 'King of the Hill', year: new Date().getFullYear(), message: 'King of the Hill' });
    }
    exports.king = king;
    ;
    function airHockey(req, res) {
        res.render('airhockey', { title: 'Air hockey', year: new Date().getFullYear(), message: 'Air hockey' });
    }
    exports.airHockey = airHockey;
    ;
});
