import { error } from "console";
import jsonwebtoken, { decode } from "jsonwebtoken";

export const checkAuthenticated = async (req,res) =>{
    const cookies = req.cookies;
    console.log(cookies.accessToken);
    
    if (!cookies.accessToken) {
        return res.sendStatus(403)
    }

    jsonwebtoken.verify(cookies.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
            return res.sendStatus(403);
        }
        return res.json({
            "ok" :true,
            "success" : true
        })
    })

    
}