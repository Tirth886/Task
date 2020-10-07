const express = require('express')
const bodyparser = require('body-parser')
const hbs = require('express-handlebars')
const cookieSession = require('cookie-session')
const fileupload = require('express-fileupload');
const app = express()
const cors = require('cors')
const connect = require("./module/connection")
var passport = require('passport');
const Handlebars = require('handlebars');
const url = require('url')
const modal = require('./module/modal')

require("./module/setup-signin")

app.use(cors())

app.use(bodyparser.urlencoded({ extended: false }))

app.use(bodyparser.json())

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {

    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/',
    helpers: Handlebars
}));
app.set('view engine', 'hbs');
app.use(fileupload());

app.use(express.static('public'));
app.use(passport.initialize())
app.use(passport.session())
app.get("/", (request, response) => {
    response.render('login', { title: 'Login' });
})
app.use(cookieSession({
    name: 'session-name',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
app.use(passport.initialize());
app.use(passport.session());
app.get('/failed', (req, res) => res.render('login', { title: "Login", error: "Failed To Login" }))
app.get('/entry', (req, res) => {
    res.render('entry', { title: "Entry" })
})
app.post('/entryinfo', (req, res) => {
    if (req.body.submit) {
        let number = req.body.number
        let role = req.body.role
        req.session.passport.user._json['phone'] = number
        req.session.passport.user._json['role'] = role

        if (modal.insertuser(req.session.passport.user._json) == true) {
            res.redirect('/dashboard');
        } else {
            req.session = null;
            req.logout();
            res.redirect('/');
        }
    }
})

app.get("/viewjob", isLoggedIn, (req, res) => {
    connect.con.query(`SELECT * FROM job`, (err, result) => {
        if (err) throw err
        if (result[0] != "") {
            res.render('listjob', { title: "LIST JOB", name: `${req.user._json.name}`, email: req.user._json.email, profile: req.user._json.picture, role: req.user._json.role, result: result, status: true })
        } else {
            res.render('listjob', { title: "LIST JOB", name: `${req.user._json.name}`, email: req.user._json.email, profile: req.user._json.picture, role: req.user._json.role, result: "NO JOBS", status: false })

        }
    })
})
app.get("/apply", isLoggedIn, (req, res) => {
    let address = req.url
    let query = url.parse(address, true)


    let data = {
        jobid: query.query.id,
        userid: req.user._json.sub,
        astatus: "pending"
    }

    modal.insertajob(data)
    res.redirect("/viewjob")

})
app.get("/update", isLoggedIn, (req, res) => {
    let address = req.url
    let query = url.parse(address, true)
    let id = query.query.id
    connect.con.query(`SELECT * FROM job WHERE id = '${id}'`, (err, result) => {
        if (err) throw err
        if (result[0] != "") {
            let response = result[0]
            res.render('addjob', {
                title: "UPDATE JOB",
                name: `${req.user._json.name}`,
                email: req.user._json.email,
                profile: req.user._json.picture,
                role: req.user._json.role,
                jtitle: response.job_title,
                jdescription: response.job_description,
                cname: response.company_name,
                area: response.area,
                jid: id,
                update: true
            });
        } else {}
    })
})

app.post("/updatejob", isLoggedIn, (req, res) => {

    if (req.body.updatejob) {
        const jobdata = {
            jid: req.body.jid,
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            area: req.body.area,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            company_name: req.body.company_name,
            status: req.body.status,
        }
        if (modal.updateJob(jobdata) == true) {
            res.redirect('/viewjob')
        } else {
            req.session = null;
            req.logout();
            res.redirect('/');
        }
    }
})

app.get("/addjob", isLoggedIn, (req, res) => {
    res.render('addjob', { title: "ADD JOB", name: `${req.user._json.name}`, email: req.user._json.email, profile: req.user._json.picture, role: req.user._json.role });
})
app.post("/addjobpost", isLoggedIn, (req, res) => {

    if (req.body.addjob) {
        const jobdata = {
            userid: req.user._json.sub,
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            area: req.body.area,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            company_name: req.body.company_name,
            status: "open",
        }
        if (modal.insertjob(jobdata) == true) {
            res.redirect('/addjob')
        } else {
            req.session = null;
            req.logout();
            res.redirect('/');
        }
    }
})

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard', { title: "Dashboard", name: `${req.user._json.name}`, email: req.user._json.email, profile: req.user._json.picture, role: req.user._json.role })
})
app.get('/appliedjob', isLoggedIn, (req, res) => {
    connect.con.query(`SELECT * FROM  appliedjob,job WHERE appliedjob.userid = '${req.user._json.sub}' AND appliedjob.jobid = job.id`, (err, result) => {
        if (err) throw err
        res.render('appliedjob', { title: "APPLIED JOB", result: result })
    })

})
app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        connect.con.query(`SELECT * FROM users WHERE email = '${req.user._json.email}'`, (err, result) => {
            if (err) throw err
            if (result.length > 0) {
                req.user._json = result[0]
                res.redirect('/dashboard');
            } else {
                res.redirect('/entry');
            }
        })
    }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
app.listen(process.env.PORT || 88)