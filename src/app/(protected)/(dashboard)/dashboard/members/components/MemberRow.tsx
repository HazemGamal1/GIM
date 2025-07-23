import React, { useState } from 'react'
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { MembershipComboBox } from '@/components/Members/Membership-combo-box';

export interface IMember {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  name: string,
  gender: string,
  startDate: string,
  endDate: string,
  branch: {
    id: string,
    name: string
  }
  membership: {
    id: string,
    name: string,
    duration: number,
  }
}
const MemberRow = ({ member } : { member : IMember}) => {
    const [editMembership, setEditMembership] = useState<boolean>(false);
    const [membershipId, setMembershipId] = useState<string>(member.membership.id)
    const [newNameVal, setNewNameVal] = useState<string>(member.name);
    const [editName, setEditName] = useState<boolean>(false)

    const onSetMembershipType = (val : string) => {
      setMembershipId(val);
    }

  return (
    <TableRow className="border bg-[#f8fafd] dark:bg-[#252525] cursor-pointer">
        <TableCell className="font-medium border">
          {member.id}
        </TableCell>
        <TableCell className="border" onDoubleClick={() => setEditMembership(!editMembership)}>
            <div className={`${member.membership.name === "Premium" ? "bg-[#f4ead3] text-[#541b0b]" : member.membership.name === "Default" ? "bg-gray-300" : member.membership.name === "Deluxe" && "bg-red-100 text-red-400"} px-1.5 py-1 max-w-max  font-semibold border`}>
                {
                    editMembership ?
                    <MembershipComboBox value={membershipId} onSetMembershipType={onSetMembershipType}/>
                    :
                    member.membership.name
                }
            </div>
        </TableCell>
        <TableCell className="border" onDoubleClick={() => setEditName(!editName)}>
          {
                    editName ?
                    <Input type="text" value={newNameVal} defaultValue={member.firstName + " " + member.lastName} onChange={(e :  React.ChangeEvent<HTMLInputElement>) => setNewNameVal(e.target.value)}/>
                    :
                    member.firstName + " " +  member.lastName
          }
                  
        </TableCell>
        <TableCell className="border">{member.email}</TableCell>
        <TableCell className="border">{member.gender}</TableCell>
        <TableCell className="border">{member.membership.duration} Days</TableCell>
        <TableCell className="border">{member.branch.name}</TableCell>
        <TableCell className="border">{member.startDate.split('T')[0]}</TableCell>
        <TableCell className="border">{member.endDate.split('T')[0]}</TableCell>
        <TableCell className="text-right border">Cash</TableCell>
    </TableRow>
  )
}

export default MemberRow
