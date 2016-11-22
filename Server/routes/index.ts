/*
 * GET home page.
 */
import express = require('express');

export function index(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};

export function about(req: express.Request, res: express.Response) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

export function contact(req: express.Request, res: express.Response) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};

export function tanks(req: express.Request, res: express.Response) {
    res.render('tanks', { title: 'Tanks', year: new Date().getFullYear(), message: 'Tanks' });
};

export function king(req: express.Request, res: express.Response) {
    res.render('king', { title: 'King of the Hill', year: new Date().getFullYear(), message: 'King of the Hill' });
};

export function airHockey(req: express.Request, res: express.Response) {
    res.render('airhockey', { title: 'Air hockey', year: new Date().getFullYear(), message: 'Air hockey' });
};