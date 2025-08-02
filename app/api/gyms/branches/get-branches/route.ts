import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(){
    try{
        const branches = await prisma.branch.findMany({
        include: {
            members: {
                include: {
                    membership: true
                }
            }
        }
        });

        const result = branches.map(branch => {
            const uniqueMemberships = new Map();

            branch.members.forEach(member => {
                const membership = member.membership;
                if (membership && !uniqueMemberships.has(membership.id)) {
                uniqueMemberships.set(membership.id, {
                    id: membership.id,
                    name: membership.name,
                    price: membership.price,
                    duration: membership.duration,
                    customBenefits: membership.customBenefits,
                    standardBenefits: membership.standardBenefits,
            });
        }
        });

      return {
        id: branch.id,
        name: branch.name,
        location: {
          name: branch.locationName,
          x: branch.locationX,
          y: branch.locationY,
        },
        membershipTypes: Array.from(uniqueMemberships.values()),
      };
    });

        return NextResponse.json(result, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error ${error}`}, { status: 500 });
    }
}