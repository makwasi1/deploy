import { NextApiRequest, NextApiResponse } from "next"

import { ResponseFuncs } from "@/utils/types";
import { connect } from "@/utils/connection";


// Our response functions
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

   //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // get id from req.query (where next stores params)
    const walletAddress  = req.query.id as string

    // Potential Responses
    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Transaction } = await connect();
            res.json(await Transaction.find({wallet_id: walletAddress}, {_id:0,__v:0,wallet_id:0}).catch(catcher))
        }
        
    }

    const response = handleCase[method]
    if(response) response(req,res)
    else res.status(400).json({error: "No response for This Request"})
}

export default handler