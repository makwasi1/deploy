import { NextApiRequest, NextApiResponse } from "next"

import { ResponseFuncs } from "@/utils/types";
import { connect } from "@/utils/connection";

// Our response functions

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  //get wallet address from local storage and use it to filter transactions
  // const walletAddress = localStorage.getItem("walletAddress");
 

    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
  
    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })
  
    // Potential Responses
    const handleCase: ResponseFuncs = {
      // RESPONSE FOR GET REQUESTS
      GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const { Transaction } = await connect() // connect to database
        res.json(await Transaction.find({wallet_id: 'addr_test1qpkvc9e77zt2877hk2756uvspuzhtm5rdhfeaqeksmuq9a9ehswfamzy2vuud5mupsh5lku7nwt6qlw7j644g9ksar5qwy7f3t'}, {_id:0,__v:0}).catch(catcher))
      },
      // RESPONSE POST REQUESTS
      POST: async (req: NextApiRequest, res: NextApiResponse) => {
        const { Transaction } = await connect() // connect to database
        res.json(await Transaction.create(req.body).catch(catcher))
      },
    }
  
    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
  }
  
  export default handler