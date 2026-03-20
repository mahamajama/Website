import session, { MemoryStore } from "express-session"

export const store = new MemoryStore();

const sessy = session({
    name: 'Sessy',
    secret: process.env.PSECRET,
    store: store,
    cookie: { 
        maxAge: 9999999999,
        sameSite: 'None',
        httpOnly: true,
        secure: true,
        proxy: true,
    },
    saveUninitialized: true,
    resave: true,
});

export default sessy;

