export default function authOnlyMiddleware(req,res,next) {
    if(req.session.username) {
        next();
    } else {
        res.sendStatus(401);
    }
}