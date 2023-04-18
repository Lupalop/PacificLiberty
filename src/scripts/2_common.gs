/* @FILE: 2_common.gs
   This Source Code Form is subject to the terms of the Mozilla Public
   License, v. 2.0. If a copy of the MPL was not distributed with this
   file, You can obtain one at http://mozilla.org/MPL/2.0/.
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
*/

//------------------------------------------------------------------------------
// Strings
//------------------------------------------------------------------------------

string
    // In-game tips
    tip_01|You can access the inventory by typing "inv" or "inventory".
    // Inaccessible actions
    ms_0|You can't do that.
    ms_1|You need something to do that.
    ms_2|I'm against that action, but I can't refuse your orders. Fortunately, I don't%nhave the specific item to do that.
    // Questions
    qs_0|Please answer the question.
    // Talk extensions
    t_10|I don't think I can talk to anyone at this point.
end

//------------------------------------------------------------------------------
// Functions [Tips]
//------------------------------------------------------------------------------

function tip_01
    printc,@HGRN,%n,tip_01,%n,@_
end

//------------------------------------------------------------------------------
// Functions [Custom]
//------------------------------------------------------------------------------

// Interaction: affirmative response
function $$_aff
    call,$_f
end
function $_aff
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_aff
    else
        call,$_f
    end
end

// Interaction: negative response
function $$_neg
    call,$_f
end
function $_neg
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_neg
    else
        call,$_f
    end
end

// Common: missing or inaccessible items
function $_ms
    printr,ms_1,ms_2
end
function $_msp
    print,ms_0
end

//------------------------------------------------------------------------------
// Actions [Custom]
//------------------------------------------------------------------------------

// Actions: Affirmative/Negative
action
    yes,y,sure,certainly,of course,no problem,yeah,yez,talk yes,accept|call,$_aff
    no,n,no way,nope,nawp,nah,not in a million years,never,talk no,refuse|call,$_neg
end
