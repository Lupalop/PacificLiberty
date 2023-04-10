/* @FILE: 2_egs.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
    Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
*/

//------------------------------------------------------------------------------
// Functions [Custom]
//------------------------------------------------------------------------------

// Interaction: swearing
function $$_swear
    call,$_go
end

function $_swear
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_swear
    else
        call,$_f
    end
end

//------------------------------------------------------------------------------
// Actions [Custom]
//------------------------------------------------------------------------------

// Actions: Swearing
action
    fuck,fuk,fack,fudge,f this,fuckdis,fuck this,fuck this shit,bitch,bitches,suck it,holy shit,holyshit,shit,bullshit,bullcrap,crap,cagar,bull shit,bull crap,s***,f***|call,$_swear
    ampota,amputa,amputangina,ampotangina,puta,putangina,putragis,tangina,mierda,tanginamo,tangina mo,putanginamo,putangina mo,p***,taena,putaena,putangena,mamamo,mama mo,rawr,gaga,goga,gago,ogag,gagu,pucha,gagi,hayop,hayup,hayop ka,tengene|call,$_swear
end
