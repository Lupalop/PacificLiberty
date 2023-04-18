/* @FILE: 2_egs.gs
   © Lupalop Games - All Rights Reserved
   This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
   To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-nd/4.0/
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
