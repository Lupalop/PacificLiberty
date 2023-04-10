/* @FILE: 1_platform.gs
   This Source Code Form is subject to the terms of the Mozilla Public
   License, v. 2.0. If a copy of the MPL was not distributed with this
   file, You can obtain one at http://mozilla.org/MPL/2.0/.
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
*/

//------------------------------------------------------------------------------
// Strings
//------------------------------------------------------------------------------

// ASCII color codes
string
    // Common
    @_|\e[0m
    @CLS|\e[H\e[2J
    @UE|\e[4m
    @UD|\e[24m
    @BE|\e[1m
    @BD|\e[21m
    // Regular text
    @BLK|\e[0;30m
    @RED|\e[0;31m
    @GRN|\e[0;32m
    @YEL|\e[0;33m
    @BLU|\e[0;34m
    @MAG|\e[0;35m
    @CYN|\e[0;36m
    @WHT|\e[0;37m
    // Regular bold text
    @BBLK|\e[1;30m
    @BRED|\e[1;31m
    @BGRN|\e[1;32m
    @BYEL|\e[1;33m
    @BBLU|\e[1;34m
    @BMAG|\e[1;35m
    @BCYN|\e[1;36m
    @BWHT|\e[1;37m
    // Regular underline text
    @UBLK|\e[4;30m
    @URED|\e[4;31m
    @UGRN|\e[4;32m
    @UYEL|\e[4;33m
    @UBLU|\e[4;34m
    @UMAG|\e[4;35m
    @UCYN|\e[4;36m
    @UWHT|\e[4;37m
    // Regular background
    @BLKB|\e[40m
    @REDB|\e[41m
    @GRNB|\e[42m
    @YELB|\e[43m
    @BLUB|\e[44m
    @MAGB|\e[45m
    @CYNB|\e[46m
    @WHTB|\e[47m
    // High intensity background 
    @BLKHB|\e[0;100m
    @REDHB|\e[0;101m
    @GRNHB|\e[0;102m
    @YELHB|\e[0;103m
    @BLUHB|\e[0;104m
    @MAGHB|\e[0;105m
    @CYNHB|\e[0;106m
    @WHTHB|\e[0;107m
    // High intensity text
    @HBLK|\e[0;90m
    @HRED|\e[0;91m
    @HGRN|\e[0;92m
    @HYEL|\e[0;93m
    @HBLU|\e[0;94m
    @HMAG|\e[0;95m
    @HCYN|\e[0;96m
    @HWHT|\e[0;97m
    // Bold high intensity text
    @BHBLK|\e[1;90m
    @BHRED|\e[1;91m
    @BHGRN|\e[1;92m
    @BHYEL|\e[1;93m
    @BHBLU|\e[1;94m
    @BHMAG|\e[1;95m
    @BHCYN|\e[1;96m
    @BHWHT|\e[1;97m
end

string
    // Newline shortcuts
    1n|%n
    2n|%n%n
    3n|%n%n%n
end

// Common messages
string
    // Fallback
    f_1|I don't understand that!
    f_2|I don't know that word.
    f_3|What?
    f_4|You're confusing!
    // Talk (empty)
    t_1|There's no one nearby.
    t_2|There's no one to talk to.
    t_3|I can't speak to ghosts.
    // Talk (people)
    t_4|Talk to whom?
    t_5|To whom should I talk to?
    t_6|Be specific. Who should I speak to?
    // Walk
    w_1|Where?
    w_2|May I know which direction?
    w_3|You can't go there.
    // Look/View
    l_1|There's nothing here.
    l_2|I don't know what you're looking for.
    l_3|What are you looking for?
    l_4|See what exactly?
    // Taking objects (generic)
    o_1|Take what?
    o_2|What do you want me to get?
    o_3|I'm not a magician.
    // Taking objects (unavailable)
    o_4|I don't see that object here.
    o_5|I can't pick something that isn't here.
    o_6|I can't take something out of thin air.
    // Inventory
    i_1|This item is already in your inventory!
    i_2|This item is NOT in your inventory!
    i_3|You only have one item in your inventory:
    i_4|You have %s items in your inventory:%n
    i_5|%s: %s%n
    i_6|Your inventory is empty!
    // Points
    p_1|You currently have %s of %s points.%n
    // Save/Load Game
    sl_1|Enter the name of your saved game:
    sl_2|Invalid name.
    sl_3|Name too long! Try a shorter name for your saved game.
    sl_4|The specified saved game was not found.
    sl_5|Your game has been loaded!
    sl_6|Your game cannot be saved.
    sl_7|Your game has been saved!
    // Game over
    go_0|Game over.
    go_1|Better luck next time!
    go_2|Perhaps you'll fare better if you restart.
    go_3|You might have missed something, think about it. Seriously.
    go_4|Look at the time! Sleep now, and try again in the morning.
end

//------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------

/*
  Reserved switches:
    0 reservedGCGDisabled      : disable all reserved global functions
    1 inventoryPointsDisabled  : inventory and points access
    2 interactionsDisabled     : interactions
    3 saveLoadDisabled         : game state load/save
    4                          : (reserved)
    5 useAlternateTalkSequence : use alternate talk sequence
  6-9                          : (reserved)
*/

// Common: Unknown commands
function $_f
    printr,f_1,f_2,f_3,f_4
end

// Common: Inventory access
function $_i
    if !reservedGCGDisabled && !inventoryPointsDisabled
        inv,list
    else
        call,$_f
    end
end

// Common: Points access
function $_p
    if !reservedGCGDisabled && !inventoryPointsDisabled
        points,list
    else
        call,$_f
    end
end

// Common: Game over
function $_go
    if !reservedGCGDisabled
        printc,1n,@BRED,go_0,@_,2n
        points,list
        printc,1n,@BRED,@UE
        printr,go_1,go_2,go_3,go_4
        printc,1n,@UD,@_
        quit
    else
        call,$_f
    end
end

// Common: Clear screen
function $_cls
    if !reservedGCGDisabled
        print,@CLS
    else
        call,$_f
    end
end

// State: Save game
function $_ss
    if !reservedGCGDisabled && !saveLoadDisabled
        save
    else
        call,$_f
    end
end

// State: Load game
function $_sl
    if !reservedGCGDisabled && !saveLoadDisabled
        load
    else
        call,$_f
    end
end

// Interaction: Talk
function $$_t
    if !useAlternateTalkSequence
        printr,t_1,t_2,t_3
    else
        printr,t_4,t_5,t_6
    end
end
function $_t
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_t
    else
        call,$_f
    end
end

// Interaction: Walk
function $$_w
    printr,w_1,w_2
end
function $_w
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_w
    else
        call,$_f
    end
end

// Interaction: Walk Towards Direction
// D: Generic
function $$_wd
    print,w_3
end
function $_wd
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_wd
    else
        call,$_f
    end
end

// D: North
function $$_wd_n
    call,$$_wd
end
function $_wd_n
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_wd_n
    else
        call,$_f
    end
end

// D: South
function $$_wd_s
    call,$$_wd
end
function $_wd_s
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_wd_s
    else
        call,$_f
    end
end

// D: East
function $$_wd_e
    call,$$_wd
end
function $_wd_e
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_wd_e
    else
        call,$_f
    end
end

// D: West
function $$_wd_w
    call,$$_wd
end
function $_wd_w
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_wd_w
    else
        call,$_f
    end
end

// Interaction: Look
function $$_l
    printr,l_1,l_2,l_3,l_4
end
function $_l
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_l
    else
        call,$_f
    end
end

// Interaction: Taking objects (generic)
function $$_o
    printr,o_1,o_2,o_3
end
function $_o
    if !reservedGCGDisabled && !interactionsDisabled
        call,$$_o
    else
        call,$_f
    end
end

// Interaction: Taking objects (unavailable)
function $_o_u
    printr,o_1,o_2,o_3
end

//------------------------------------------------------------------------------
// Actions
//------------------------------------------------------------------------------

// Actions: Common/State
action
    fallback|call,$_f
    inventory,check inventory,get inventory,inv,check inv,get inv|call,$_i
    bag,check bag,get bag|call,$_i
    score,check score,view score|call,$_p
    points,check points,view points|call,$_p
    clear,cls|call,$_cls
    save|call,$_ss
    load|call,$_sl
    quit|quit
end

// Actions: Interactions
action
    // Talk/Converse/Chat/Speak
    talk,talk to,talk with|call,$_t
    converse,converse to,converse with|call,$_t
    chat,chat to,chat with|call,$_t
    speak,speak to,speak with|call,$_t
    
    // Pick/Take/Get/Snatch/Grasp/Pull/Reach
    pick,take,get,snatch,grasp,pull,reach|call,$_o
    
    // Look/View/See/Check
    look,look around,look surroundings,look at,look place|call,$_l
    view,view around,view surroundings,view place|call,$_l
    see,see around,see surroundings,see place|call,$_l
    check,check around,check surroundings,check place|call,$_l
    
    // Walk/Run/Go/Travel
    walk,run,go,travel|call,$_w
    
    // Walk/Run/Go/Travel Towards Direction
    // D: North
    walk north,walk n,run north,run n,go north,go n,travel north,travel n|call,$_wd_n
    // D: South
    walk south,walk s,run south,run s,go south,go s,travel south,travel s|call,$_wd_s
    // D: East
    walk east,walk e,run east,run e,go east,go e,travel east,travel e|call,$_wd_e
    // D: West
    walk west,walk w,run west,run w,go west,go w,travel west,travel w|call,$_wd_w
end
