// query: { inStock: { $elemMatch: { $eq: true } } }

import { stdout } from "process";
import { getMongoClient } from "../../../_utils/db";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../_lib/db";

export const GET = async (request: NextRequest, context) => {

    // fetch ID from context params /api/scaffold/[id]
    let { id } = context.params;

    try {

        // grab mongo client and find our collection
        const client = await clientPromise;
        const coll = client.db('data').collection('scaffolds');

        const filter = {
            '_id': new ObjectId(id),
        };

        const query = coll.find(filter);
        const res = await query.toArray();
            
        if( res ) {

            return NextResponse.json({
                
                success: true,
                message: `/api/scaffold/${id} HIT a match!`,
                data: res,

            }, { status: 200 });

        }

    } catch (err) {

        console.log(`Error: ${err}, ( /api/scaffold/[id] )`);

        return NextResponse.json({
            success: false,
            message: `/api/scaffold/${id} errored, probably no match`,
            data: err,
        }, { status: 404 });

    }

} 