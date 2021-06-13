/* @FILE: 0_prefs.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
*/

//------------------------------------------------------------------------------
// Preferences
//------------------------------------------------------------------------------

maxpoints 215
switches 3000

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
    // High intensty background 
    @BLKHB|\e[0;100m
    @REDHB|\e[0;101m
    @GRNHB|\e[0;102m
    @YELHB|\e[0;103m
    @BLUHB|\e[0;104m
    @MAGHB|\e[0;105m
    @CYNHB|\e[0;106m
    @WHTHB|\e[0;107m
    // High intensty text
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
// Command groups
//------------------------------------------------------------------------------

/*
  Reserved switches:
    0: disable all reserved global command groups
    1: inventory and points access
    2: interactions
    3: game state load/save
    4: (reserved)
    5: use alternate talk sequence
  6-9: (reserved)
*/

// Common: Unknown commands
group $_f
    printr,f_1,f_2,f_3,f_4
end

// Common: Inventory access
group $_i
    if !0,!1
        inv,list
    else
        goto,$_f
    end
end

// Common: Points access
group $_p
    if !0,!1
        points,list
    else
        goto,$_f
    end
end

// Common: Game over
group $_go
    if !0
        printc,1n,@BRED,go_0,@_,2n
        points,list
        printc,1n,@BRED,@UE
        printr,go_1,go_2,go_3,go_4
        printc,1n,@UD,@_
        quit
    else
        goto,$_f
    end
end

// Common: Clear screen
group $_cls
    if !0
        print,@CLS
    else
        goto,$_f
    end
end

// State: Save game
group $_ss
    if !0,!3
        save
    else
        goto,$_f
    end
end

// State: Load game
group $_sl
    if !0,!3
        load
    else
        goto,$_f
    end
end

// Interaction: Talk
group $$_t
    if !5
        printr,t_1,t_2,t_3
    else
        printr,t_4,t_5,t_6
    end
end
group $_t
    if !0,!2
        goto,$$_t
    else
        goto,$_f
    end
end

// Interaction: Walk
group $$_w
    printr,w_1,w_2
end
group $_w
    if !0,!2
        goto,$$_w
    else
        goto,$_f
    end
end

// Interaction: Walk Towards Direction
// D: Generic
group $$_wd
    print,w_3
end
group $_wd
    if !0,!2
        goto,$$_wd
    else
        goto,$_f
    end
end

// D: North
group $$_wd_n
    goto,$$_wd
end
group $_wd_n
    if !0,!2
        goto,$$_wd_n
    else
        goto,$_f
    end
end

// D: South
group $$_wd_s
    goto,$$_wd
end
group $_wd_s
    if !0,!2
        goto,$$_wd_s
    else
        goto,$_f
    end
end

// D: East
group $$_wd_e
    goto,$$_wd
end
group $_wd_e
    if !0,!2
        goto,$$_wd_e
    else
        goto,$_f
    end
end

// D: West
group $$_wd_w
    goto,$$_wd
end
group $_wd_w
    if !0,!2
        goto,$$_wd_w
    else
        goto,$_f
    end
end

// Interaction: Look
group $$_l
    printr,l_1,l_2,l_3,l_4
end
group $_l
    if !0,!2
        goto,$$_l
    else
        goto,$_f
    end
end

// Interaction: Taking objects (generic)
group $$_o
    printr,o_1,o_2,o_3
end
group $_o
    if !0,!2
        goto,$$_o
    else
        goto,$_f
    end
end

// Interaction: Taking objects (unavailable)
group $_o_u
    printr,o_1,o_2,o_3
end

//------------------------------------------------------------------------------
// Actions
//------------------------------------------------------------------------------

// Actions: Common/State
action
    fallback|goto,$_f
    inventory,check inventory,get inventory,inv,check inv,get inv|goto,$_i
    bag,check bag,get bag|goto,$_i
    score,check score,view score|goto,$_p
    points,check points,view points|goto,$_p
    clear,cls|goto,$_cls
    save|goto,$_ss
    load|goto,$_sl
    quit|quit
end

// Actions: Interactions
action
    // Talk/Converse/Chat/Speak
    talk,talk to,talk with|goto,$_t
    converse,converse to,converse with|goto,$_t
    chat,chat to,chat with|goto,$_t
    speak,speak to,speak with|goto,$_t
    
    // Pick/Take/Get/Snatch/Grasp/Pull/Reach
    pick,take,get,snatch,grasp,pull,reach|goto,$_o
    
    // Look/View/See/Check
    look,look around,look surroundings,look at,look place|goto,$_l
    view,view around,view surroundings,view place|goto,$_l
    see,see around,see surroundings,see place|goto,$_l
    check,check around,check surroundings,check place|goto,$_l
    
    // Walk/Run/Go/Travel
    walk,run,go,travel|goto,$_w
    
    // Walk/Run/Go/Travel Towards Direction
    // D: North
    walk north,walk n,run north,run n,go north,go n,travel north,travel n|goto,$_wd_n
    // D: South
    walk south,walk s,run south,run s,go south,go s,travel south,travel s|goto,$_wd_s
    // D: East
    walk east,walk e,run east,run e,go east,go e,travel east,travel e|goto,$_wd_e
    // D: West
    walk west,walk w,run west,run w,go west,go w,travel west,travel w|goto,$_wd_w
end

/* @FILE: 2_common.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
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
// Command groups [Tips]
//------------------------------------------------------------------------------

group tip_01
    printc,@HGRN,%n,tip_01,%n,@_
end

//------------------------------------------------------------------------------
// Command groups [Temporary]
//------------------------------------------------------------------------------

// Replacements for missing gotob (go to base group command)
// XXX: Keep in sync with 1_platform.gs
group ~$_f
    printr,f_1,f_2,f_3,f_4
end
group ~$$_t
    if !5
        printr,t_1,t_2,t_3
    else
        printr,t_4,t_5,t_6
    end
end
group ~$$_w
    printr,w_1,w_2
end
group ~$$_l
    printr,l_1,l_2,l_3,l_4
end
group ~$$_o
    printr,o_1,o_2,o_3,o_4
end
group ~$$_wd
    print,w_3
end
group ~$_ms
    printr,ms_1,ms_2
end
group ~$_msp
    print,ms_0
end

//------------------------------------------------------------------------------
// Command groups [Custom]
//------------------------------------------------------------------------------

// Interaction: affirmative response
group $$_aff
    goto,$_f
end
group $_aff
    if !0,!2
        goto,$$_aff
    else
        goto,$_f
    end
end

// Interaction: negative response
group $$_neg
    goto,$_f
end
group $_neg
    if !0,!2
        goto,$$_neg
    else
        goto,$_f
    end
end

// Common: missing or inaccessible items
group $_ms
    printr,ms_1,ms_2
end
group $_msp
    print,ms_0
end

//------------------------------------------------------------------------------
// Actions [Custom]
//------------------------------------------------------------------------------

// Actions: Affirmative/Negative
action
    yes,y,sure,certainly,of course,no problem,yeah,yez,talk yes,accept|goto,$_aff
    no,n,no way,nope,nawp,nah,not in a million years,never,talk no,refuse|goto,$_neg
end

/* @FILE: 2_egs.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
    Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
*/

//------------------------------------------------------------------------------
// Command groups [Custom]
//------------------------------------------------------------------------------

// Interaction: swearing
group $$_swear
    goto,$_go
end

group $_swear
    if !0,!2
        goto,$$_swear
    else
        goto,$_f
    end
end

//------------------------------------------------------------------------------
// Actions [Custom]
//------------------------------------------------------------------------------

// Actions: Swearing
action
    fuck,fuk,fack,fudge,f this,fuckdis,fuck this,fuck this shit,bitch,bitches,suck it,holy shit,holyshit,shit,bullshit,bullcrap,crap,cagar,bull shit,bull crap,s***,f***|goto,$_swear
    ampota,amputa,amputangina,ampotangina,puta,putangina,putragis,tangina,mierda,tanginamo,tangina mo,putanginamo,putangina mo,p***,taena,putaena,putangena,mamamo,mama mo,rawr,gaga,goga,gago,ogag,gagu,pucha,gagi,hayop,hayup,hayop ka,tengene|goto,$_swear
end

/* @FILE: 99_debug.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
*/

// Common: Game over
group $_go
    if !0
        printc,1n,@BRED,go_0,@_,2n
        points,list
        printc,1n,@BRED,@UE
        printr,go_1,go_2,go_3,go_4
        printc,1n,@UD,@_
        //quit
        printc,2n,<quit overridden>,1n
    else
        goto,$_f
    end
end

// Scene shortcuts
scene 0
    group $
        scene,s00_prompt
    end
end
scene 1
    group $
        scene,s01_premarch_exposition
    end
end
scene 2
    group $
        scene,s02_cabcaben_arrival
    end
end
scene 3
    group $
        scene,s03_sanfernando_arrival
    end
end
scene 4
    group $
        scene,s04_campdonnell_arrival
    end
end
scene 5
    group $
        scene,s05_end
    end
end

/* @FILE: s00_intro.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
*/

// Scene: Initial
scene initial
    group $
        scene,s00_prompt
    end
end

// Scene: Prompt on start
scene s00_prompt
    // Messages
    string
         tAh0|  ██████╗  █████╗  ██████╗██╗███████╗██╗ ██████╗%n
         tAh1|  ██╔══██╗██╔══██╗██╔════╝██║██╔════╝██║██╔════╝%n
         tAh2|  ██████╔╝███████║██║     ██║█████╗  ██║██║     %n
         tAh3|  ██╔═══╝ ██╔══██║██║     ██║██╔══╝  ██║██║     %n
         tAh4|  ██║     ██║  ██║╚██████╗██║██║     ██║╚██████╗%n
         tAh5|  ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝╚═╝     ╚═╝ ╚═════╝%n
         tAh6|      ██╗     ██╗██████╗ ███████╗██████╗ ████████╗██╗   ██╗%n
         tAh7|      ██║     ██║██╔══██╗██╔════╝██╔══██╗╚══██╔══╝╚██╗ ██╔╝%n
         tAh8|      ██║     ██║██████╔╝█████╗  ██████╔╝   ██║    ╚████╔╝ %n
         tAh9|      ██║     ██║██╔══██╗██╔══╝  ██╔══██╗   ██║     ╚██╔╝  %n
        tAh10|      ███████╗██║██████╔╝███████╗██║  ██║   ██║      ██║   %n
        tAh11|      ╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝      ╚═╝   %n
        tA1|Please answer the question with either YES or NO.%n
        tA2|Welcome to Pacific Liberty! Would you like some instructions?%n
    end
    // Show introduction question on entry
    group $
        set,0,true
        printc,1n,@HBLU,tAh0,tAh1,tAh2,tAh3,tAh4,tAh5,@HRED,tAh6,tAh7,tAh8,tAh9,tAh10,tAh11,@_,tA2
    end
    // Re-ask the question on invalid keywords
    group $_f
        printc,tA1,tA2
    end
    // YES
    group $_aff
        scene,s00_introduction
    end
    // NO
    group $_neg
        set,0,false
        scene,s01_premarch_exposition
    end
end

// Scene: Introduction
scene s00_introduction
    // Introduction message (see lt_instructions for a clean copy of this text)
    string
          tS|║  ---  ---  ---  ---  ---  ---  ---  ----  ---  ---  ---  ---  ---  ---  ---  ║%n
          tH|╔═Introduction═════════════════════════════════════════════════════════════════╗%n
         tI0|║ Welcome to Pacific Liberty, where you'll play the role of a young man who    ║%n
         tI1|║ surprisingly went back in time when he entered their grandparents' old house.║%n
         tI2|║ Flabbergasted with what has befallen his fate, he began exploring an area    ║%n
         tI3|║ looming with people that are wearing unfamiliar clothes, a relic of the past.║%n
        // tS
         tI4|║ Unaware with what he needs in order to survive, he needs your help.          ║%n
         tI5|║ He'll be your eyes and hands, and direct him with words as if you're talking ║%n
         tI6|║ and instructing someone. Be warned that he doesn't understand mispelled words║%n
         tI7|║ or slang. Write in a variety of English that isn't broken. For instance, if  ║%n
         tI8|║ you want him to pack up or get his bag, just type `pack up` or `get bag`.    ║%n
        // tS
         tI9|║ Walking, running, and speaking to others is relatively simple.               ║%n
        tI10|║ Just type "WALK NORTH" if you'd want him to walk north, "RUN AWAY" if you    ║%n
        tI11|║ want him to run away, and if you'd like to speak with someone, like a person ║%n
        tI12|║ who is referred to as "general", just type "SPEAK GENERAL" or "TALK GENERAL".║%n
        tI13|║ Even typing only "TALK" will work in some cases, but not always!             ║%n
        // tS
        tI14|║ The following commands might also prove useful in your journey:              ║%n
        tI15|║ "SAVE" or "LOAD" after which you need to type the the name of the saved game.║%n
        tI16|║ "POINTS" if you'd like to keep track of your progress or score.              ║%n
        tI17|║ "INVENTORY" or "INV" if you'd like to check the items in your inventory.     ║%n
        // tS
        tI18|║                                 *GOOD LUCK!*                                 ║%n
        tI19|║                          Type ANYTHING to CONTINUE.                          ║%n
          tE|╚══════════════════════════════════════════════════════════════════════════════╝
    end
    // Show readme on entry
    group $
        // Set color to blue
        printc,@CLS,@BLUB
        // Print the entire readme
        printc,tH,tI0,tI1,tI2,tI3,tS,tI4,tI5,tI6,tI7,tI8,tS,tI9,tI10,tI11,tI12,tI13,tS,tI14,tI15,tI16,tI17,tS,tI18,tI19,tE,@_,2n
    end
    // Fallback: automatically start the game on any command
    group $_f
        set,0,false
        print,@CLS
        scene,s01_premarch_exposition
    end
end

/* @FILE: s01_premarch.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
     Cecille Marie Milan <clmilan@student.apc.edu.ph>
*/

/* @NOTES:
   Allocated switches: 10-49
*/

// Before Death March: Part 01 (start until rock)
scene s01_premarch_exposition
    // Strings
    string
        // Death sequences
        01_pme_d1|You did not jump which led to you stumbling over. As you lay down, you can see %nthe bombs dropping from the sky by the Japanese.
        // Look
        01_pme_l0|A young man discovered an entryway to the past in their ancestor's old house.%nIt's as if he has entered into an entirely new world, back in the 1940s, with %npeople looming in the background and the streets bustling with life. There was %na crowd forming around the capitol building. %n%nSgt. Miller, a man of the American forces, is holding a clipboard bearing the %nnames of the Filipino troops who will fight alongside the Americans to stop the %nJapanese army.
        01_pme_l1|A lot of soldiers are boarding the ship to Bataan, while %nSgt. Miller is still examining the clipboard with the list of names. %n%nPerhaps you should board the ship too.
        01_pme_l2|You look up the sky and saw there were aircrafts flying fast in the %nclear and humid sky of Pampanga. Many people were shouting how annoying the %nUS Navy is for showing off their flying formation. However, one look at it and %nyou will know which country it truly belonged to. %n%n"It's the Japs! Run for shelter! Bombs!"
        01_pme_l3|You saw a huge rock coming your way, should you jump over?
        // Talk
        01_pme_t0| said Sgt. Miller.
        01_pme_t1|"Make a move on, kid! Unless you want to die at the hands of your foolishness."
        01_pme_t2|"Pack-up, lads!"
        01_pme_t3|"Majority of the soldiers here will be evacuated by ship to Bataan %nPeninsula to stop those sons of a gun from invading."
    end
    // LGO: Entry
    group $
        set,5,true
        print,01_pme_l0
    end
    // LGO: Fallback
    group $_f
        print,01_pme_t1
    end
    // LGO: Talk
    group $$_t
        if !10,!11,!12
            printc,01_pme_t2,01_pme_t0,1n
        elsif 10,!11,!12
            printc,01_pme_t3,01_pme_t0,1n
        else
            goto,~$$_t
        end
    end
    // LGO: Look
    group $$_l
        if !10,!11,!12
            print,01_pme_l0
        elsif 10,!11,!12
            print,01_pme_l1
        elsif 10,11,!12
            print,01_pme_l2
        elsif 10,11,12
            print,01_pme_l3
        else
            goto,~$$_l
        end
    end
    // 1: Packing up of bags
    group event_1
        if !10
            print,01_pme_t3
            set,10,true
            points,add,5
        else
            goto,$_f
        end
    end
    // 2: Running away from the Japanese
    group event_2
        if 10,!11
            print,01_pme_l2
            set,11,true
            set,5,false
            points,add,5
        else
            goto,$_f
        end
    end
    // 3: Jump over a rock [P]
    group event_3
        if 10,11,!12
            print,01_pme_l3
            set,12,true
            points,add,5
        else
            goto,$_f
        end
    end
    // 4a: Jump over a rock (YES)
    group event_4a
        if 10,11,12,!13
            set,13,true
            points,add,5
            scene,s01_premarch_ticket
        else
            goto,$_f
        end
    end
    group $$_aff
        goto,event_4a
    end
    // 4b: Jump over a rock (NO) [D]
    group event_4b
        if 10,11,12,!13
            print,01_pme_d1
            goto,$_go
            quit
        else
            goto,$_f
        end
    end
    group $$_neg
        goto,event_4b
    end
    // Actions
    action
        pack,get,pack up,take up,get up,move up|goto,event_1
        board ship,board to ship,board the ship,enter ship,enter the ship,head to ship,go to ship,goto ship,head ship,walk ship,to ship,go ship,ship,run ship,run to ship|goto,event_2
        run,runaway,run away,run far,run faraway,run north,run south,run east,run west|goto,event_3
        talk to miller,talk miller,converse miller,converse with miller,chat miller,chat with miller,speak to miller,speak with miller|goto,$_t
    end
end

// Before Death March: Part 02 (ticket until headquarters entry)
scene s01_premarch_ticket
    // Strings
    string
        // Death sequences
        02_pmt_d0|Your hiding spot was unsafe. It got bombed and you died!
        02_pmt_d1| Upon arrival, the Japanese man%nasks for the ticket. You don't have any and the general doesn't have an extra%nticket lying around. Their soldiers were called and you were taken inside%ntheir headquarters, towards the west wing.
        02_pmt_d2|We all know what happens there, don't we?
        // Look
        02_pmt_l0|You've found 3 potential shelters: %nunder a tree, inside a broken house, and a trench. %n%nWhich will you choose to hide in?
        02_pmt_l1|You are currently in a trench along with other soldiers. The general is beside %nyou, observing the background. There's nothing to be seen on %nthe ground aside from dirt.
        // Talk
        02_pmt_t0|"The American and Philippine forces have started to surrender to the Japanese."%nThe general said.%n%n"Oh, how bad news indeed." You replied back.
        02_pmt_t1|"They have given out surrender tickets to our soldiers. Approach them in their %nheadquarters while waving a white flag and your guns pointed behind you." %nThe general looked doubtful about it though.
        02_pmt_t2|"Well, if you'd ask me, this ticket system is sketchy. But we'll never know.%nBest not lose hope in war, kid. Will you go? I can accompany you%nuntil we reach their camp." The general said.
        02_pmt_t3|The general accompanies you to the outskirts of the Japanese headquarters.%n%nThe flag of the rising sun is all over the place.
        02_pmt_t4| Upon arrival, the Japanese man%nin the line sees the ticket and guides you to their headquarters.
        02_pmt_t5|I'm afraid I can't refuse the general. There doesn't seem to be any other choice. Insubordination is a thing, you know.
        // Take
        02_pmt_o0|You've taken the ticket from the general's hands.
        02_pmt_o1|You've already taken the ticket from the general. Don't ask for more.
        02_pmt_o2|"There's no ticket to be taken."%nThe general said it might have fallen off somewhere. Oops.
        // Interactions
        02_pmt_a0|You have lived to see another day. %nYou saw the general in the trench and approached him. 
    end
    // Items
    item
        white flag|The first of two items that one needs before surrendering.
        ticket|The second of two items that one needs before surrendering.
    end
    // LGO: Entry
    group $
        set,5,true
        print,02_pmt_l0
    end
    // LGO: Look
    group $$_l
        if !14
            print,02_pmt_l0
        else
            print,02_pmt_l1
        end
    end
    // LGO: Talk
    group $$_t
        goto,event_6a
    end
    // LGO: Affirmative
    group $$_aff
        goto,event_7a
    end
    // LGO: Negative
    group $$_neg
        goto,event_7b
    end
    // 5a: Choose hiding spot (unsafe) [D]
    group event_5a
        print,02_pmt_d0
        goto,$_go
    end
    // 5b: Choose hiding spot (safe)
    group event_5b
        if !14
            print,02_pmt_a0
            set,14,true
            points,add,5
        else
            goto,$_f
        end
    end
    // 6a: Conversation with General
    group event_6a
        // CO: Bad news
        if 14,!15
            print,02_pmt_t0
            set,15,true
            points,add,2
        // CO: Surrender tickets
        elsif 14,15,!16
            printc,02_pmt_t1,2n
            inv,add,white flag
            inv,list
            goto,tip_01
            set,16,true
            points,add,2
        // CO: Sketchy system [P]
        elsif 14,15,16,!17
            print,02_pmt_t2
            // We keep switch no. 17 as-is because this is the last message
            if !18
                points,add,1
                set,18,true
            end
        else
            goto,~$$_t
        end
    end
    // 6b: Take ticket from the General
    group event_6b
        if 16,!18
            if_inv !ticket
                inv,add,ticket
                print,02_pmt_o0
                points,add,5
            else
                print,02_pmt_o1
            end
        elsif 18
            if_inv ticket
                print,02_pmt_o1
            else
                print,02_pmt_o2
            end
        else
            goto,$_o
        end
    end
    // 7a: Go to Japanese HQ (YES) [D]
    group event_7a
        if 18
            if_inv ticket
                printc,02_pmt_t3,02_pmt_t4,2n
                inv,rm,ticket
                inv,rm,white flag
                points,add,5
                scene,s01_premarch_hq
            else
                printc,02_pmt_t3,02_pmt_d1,2n,@HRED,02_pmt_d2,@_,1n
                goto,$_go
            end
        else
            goto,$_f
        end
    end
    // 7b: Go to Japanese HQ (NO)
    group event_7b
        if 18
            print,02_pmt_t5
        else
            goto,$_f
        end
    end
    // 7c: Go to Japanese HQ (YES-through walk)
    group event_7c
        if 18
            goto,event_7a
        else
            goto,$_wd
        end
    end
    // Actions
    action
        under a tree,under tree,tree,tree under,inside the house,inside house,inside,house,the house|goto,event_5a
        in the trench,trench,walk to trench,walk trench,in trench,the trench,to trench,run trench,run to trench,walk to the trench,run to the trench,run the trench,walk the trench|goto,event_5b
        talk general,talk to general,converse general,converse with general,chat to general,chat with general,chat general,speak to general,speak with general,speak general,interact with general,interact to general|goto,event_6a
        ticket,take ticket,pick ticket,get ticket,snatch ticket,grasp ticket,pull ticket,reach ticket|goto,event_6b
        walk camp,walk to camp,run camp,run to camp,go camp, go to camp|goto,event_7c
    end
end

// Before Death March: Part 03 (ticket until headquarters entry)
scene s01_premarch_hq
    // Strings
    string
        // Death sequences
        03_pmh_d0|You tried to stand up but it was too late.
        03_pmh_d1|He waited no more and shot you dead.
        // Look
        03_pmh_l0|This is the makeshift Japanese headquarters. You see a lot of chairs with ropes %nand began to tremble. You've never seen anything like this before and is %nshaken with how your grandfather was able to survive this kind of experience.
        03_pmh_l1|The Japanese man stares at you impatiently and is at the verge of pushing you %ntowards the holding area. You might want to consider walking now.
        03_pmh_l2|The holding area is located north, relative to where you're standing, while %nthere are two other signs: the east wing which leads to the Infirmary, and the %nwest wing whose floor seems to be filled with odd stains.
        03_pmh_l3|You're currently inside a prison cell.
        // Talk
        03_pmh_t0|"Where do you think you're going?" The Japanese soldier yelled.
        03_pmh_t1|"We've a newcomer," one of the American soldiers said.
        03_pmh_t2|"I'm afraid there's nothing we can do for now, aside from to sleep or wait for%nthe thing they call food," muttered Stanley, one of the soldiers.
        03_pmh_t3|"Wala na tayong magagawa pa, maliban sa matulog [sleep] o hintayin ang tinatawag%nnilang pagkain [food] dito," muttered José, one of the soldiers.
        03_pmh_t4|"You'd be crazy to think that we'd be able to escape this hellhole 'cause it's%nbuilt to last!" muttered Stanley, one of the soldiers.
        03_pmh_t5|"Try shouting or swearing, it calms the nerves," said David, one of the soldiers.
        03_pmh_t6|The Japanese soldiers are ignoring your pleas of safety and help. Many footsteps%ncan be heard from the hallway, and you try your hardest to look who's come to%nyour rescue or imprisonment.
        03_pmh_t7|A Japanese soldier stepped out of the shadows with a rifle in his hand.%n%n"The tickets were a ruse to further tip the balance of survival and victory on%nour side," said the Japanese soldier.
        // Walk
        03_pmh_w0|You heard unintelligible noises from the Japanese soldier behind you.%nHe seems to be speaking in a language that you cannot decipher.
        03_pmh_w1|You face him and the Japanese soldier readily drags you towards the west wing%nand throws you into one of the cells.
        03_pmh_w2|You continued walking towards the holding area until you heard someone speak.
        03_pmh_w3| Other fellow American and Filipino%nsoldiers are also imprisoned and sharing the same cell as yours.
        // Interactions
        03_pmh_a0|You sat near one of the four corners of the cell, confused and contemplating as%nto why these things are happening to you... A few minutes later and for some%nreason, you were fast asleep.
    end
    // LGO: Entry
    group $
        set,5,true
        print,03_pmh_l0
    end
    // LGO: Fallback
    group $_f
        // X01: Entrance
        if !19
            print,03_pmh_l1
        else
            goto,~$_f
        end
    end
    // LGO: Look
    group $$_l
        // X01: Entrance
        if !19
            printc,03_pmh_l0,2n,03_pmh_l2,1n
        // X02: Prison Cell
        elsif 19,!20
            printc,03_pmh_l3,03_pmh_w3,1n
        else
            goto,~$$_l
        end
    end
    // LGO: Talk
    group $$_t
        // X01: Entrance
        if !19
            print,03_pmh_l1
        // X02: Prison Cell (soldier talk)
        elsif 19,!20
            printr,03_pmh_t2,03_pmh_t3,03_pmh_t4,03_pmh_t5
        else
            goto,~$$_t
        end
    end
    // LGO: Direction (Generic)
    group $$_wd
        if 19,!20
            print,03_pmh_t0
        else
            goto,~$$_wd
        end
    end
    // LGO: Direction (North)
    group $$_wd_n
        if !19
            set,19,true
            points,add,5
            printc,03_pmh_w2,2n,03_pmh_w0,2n,03_pmh_w1,03_pmh_w3,2n,03_pmh_t1,1n
        else
            goto,$$_wd
        end
    end
    // LGO: Direction (East) [D]
    group $$_wd_e
        if !19
            printc,03_pmh_w0,2n,03_pmh_w1,03_pmh_d0,2n
            printc,@HRED,03_pmh_d1,@_,1n
            goto,$_go
        else
            goto,$$_wd
        end
    end
    // LGO: Direction (West) [D]
    group $$_wd_w
        if !19
            goto,$$_wd_e
        else
            goto,$$_wd
        end
    end
    // 8: Sleep
    group event_8
        if 19,!20
            print,03_pmh_a0
            set,20,true
            points,add,5
            scene,s01_premarch_final
        else
            goto,$_f
        end
    end
    // 9: Shout/Plead for Help [D]
    group event_9
        if 19,!20,!21
            print,03_pmh_t6
            set,21,true
        elsif 19,!20,21
            printc,03_pmh_t7,2n
            printc,@HRED,03_pmh_d1,@_,1n
            goto,$_go
        else
            goto,$_f
        end
    end
    // Actions
    action
        talk soldier,talk to soldier,talk with soldier|goto,$_t
        converse soldier,converse to soldier,converse with soldier|goto,$_t
        chat soldier,chat to soldier,chat with soldier|goto,$_t
        speak soldier,speak to soldier,speak with soldier|goto,$_t
        sleep,tulog,go to sleep,lie down,sleep now,sleep down,sleep floor,sleep on floor,sleep on the floor,just sleep|goto,event_8
        shout,shout loud,shout help,plead for help,plead,send help,get help|goto,event_9
    end
end

// Before Death March: Part 04 (final)
scene s01_premarch_final
    // Strings
    string
        // Death sequences
        04_pmf_d0|You're not interested? Okay...
        // Look
        04_pmf_l0|Today is the 9th of April 1942, the time when the Americans surrendered to the%nforces of the Japanese. The troops captive consists of 66,000 Filipinos and%n12,000 Americans. The country is now subjugated by the Japanese and compel us to%nwalk 65 miles from Mariveles, Bataan to Camp O'Donnell.%n%nAre you ready to march to death?
        04_pmf_l1|Due to the huge number of captives, it was divided into groups consisting of%n100 to 1000 troops.
        04_pmf_l2| You noticed that there's a man trying to converse with you.
        // Talk
        04_pmf_t0|"Don't you think the Japanese are being too harsh on us? I mean, we're also%nsoldiers like them," complained the man who introduced himself%nas Antonio, a fellow soldier.
        04_pmf_t1|"No, best we keep our mouths shut," you answered.
        04_pmf_t2|He was taken aback. You guys stopped talking.
        04_pmf_t3|Both of you conversed for a while. You quickly became close friends with him.
        04_pmf_t4|Lieutenant General Homma Masaharu fired a gun so the troops will stop talking and start walking. "Rokudenashi, isoide!" the General shouted at the troops.
    end
    // LGO: Entry
    group $
        set,5,true
        print,04_pmf_l0
    end
    // LGO: Talk
    group $$_t
        // X02: Talk with Antonio
        if 22,!24
            print,04_pmf_t0
            if !23
                set,23,true
                points,add,2
            end
        elsif 22,23,24
            print,04_pmf_t4
        else
            goto,~$$_t
        end
    end
    // LGO: Walk
    group $$_wd_e
        if 22,23,24
            goto,event_12
        else
            goto,~$$_wd
        end
    end
    // LGO: Look
    group $$_l
        // X01: Initial walk prompt
        if !22
            print,04_pmf_l0
        // X02: Talk with Antonio
        elsif 22,!24
            printc,04_pmf_l1,04_pmf_l2,1n
        elsif 22,24
            print,04_pmf_l1
        else
            goto,~$$_l
        end
    end
    // LGO: Affirmative
    group $$_aff
        // X01: Initial walk prompt
        if !22
            goto,event_10a
        // X02: Talk with Antonio
        elsif 22,23,!24
            goto,event_11a
        else
            goto,$_f
        end
    end
    // LGO: Negative
    group $$_neg
        // X01: Initial walk prompt
        if !22
            goto,event_10b
        // X02: Talk with Antonio
        elsif 22,23,!24
            goto,event_11b
        else
            goto,$_f
        end
    end
    // 10a: Yes to the march
    group event_10a
        printc,04_pmf_l1,04_pmf_l2,1n
        set,22,true
        points,add,5
    end
    // 10b: No to the march [D]
    group event_10b
        printc,@HRED,04_pmf_d0,@_,1n
        goto,$_go
    end
    // 11a: "Yes to friends"
    group event_11a
        set,24,true
        // SW: 25 - Friends with Antonio
        set,25,true
        points,add,3
        print,04_pmf_t3
    end
    // 11b: "No to friends"
    group event_11b
        set,24,true
        points,add,1
        printc,04_pmf_t1,2n,04_pmf_t2,1n
    end
    // 12: Switch to Cabcaben
    group event_12
        points,add,5
        scene,s02_cabcaben_arrival
    end
    // Actions
    action
        talk antonio,talk to antonio,talk with antonio|goto,$_t
        converse antonio,converse to antonio,converse with antonio|goto,$_t
        chat antonio,chat to antonio,chat with antonio|goto,$_t
        speak antonio,speak to antonio,speak with antonio|goto,$_t
    end
end

/* @FILE: s02_cabcaben.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
     Cecille Marie Milan <clmilan@student.apc.edu.ph>
     Timothy Jay Sayson <tvsayson@student.apc.edu.ph>
*/

/* @NOTES:
   Allocated switches: 50-99
   02: interactions
   25: Friends with Antonio
   51: Talk #1 with Soldier
   52: Talk #2 with Soldier
   53: Pushed by soldier
   54: Stood up 
   55: Rock: can't be picked anymore
   56: Allow talk to Antonio
   57: Enable handling of question about plan
   58: Plan question sequence finished
   59: Rock death sequence #1 [Friends]
   60: Rock death sequence #2
   61: Rock death sequence #3
   62: Rock death sequence #4
   63: Steal keys plan
   64: Can fight back Japanese soldier
   65: Final plan talk
   99: Rock death sequence
*/

// Cabcaben: Part 01 (Arrival)
scene s02_cabcaben_arrival
    // Strings
    string
        // Death sequences
        05_cba_d0|He suddenly stopped walking, which drew the attention of the Japanese soldiers.
        05_cba_d1|"The Japanese might see that on you. Hide it!" said Antonio.
        05_cba_d2|The soldiers saw that you two were struggling and demanded to know what the cause for it was.
        05_cba_d3|You wouldn't budge, but the Japanese tried to search you and Antonio for any sort of weapons. They found the rock. Oh no.
        05_cba_d4|They showed the rock and demanded to know what it was for.
        05_cba_d5|The Japanese soldier got annoyed that a mere human being like you tried to fight%nback and as a consequence, he shot you in the head.
        05_cba_d6|Like a child, you threw the rock at the Japanese soldier.
        05_cba_d7|You strangled the poor guy, and everyone saw the commotion. Your life too, was taken.
        05_cba_d8|Like a child, you threw the rock at Antonio.
        // Look
        05_cba_l0|You have arrived at Cabcaben and saw one of the troops begging for water and%nfood. One of the Japanese soldiers beated him up using their rifle butt and%nforced him to walk again. You rushed to your troop who is getting beaten.
        05_cba_l1|You might want to stand up now, or else...
        05_cba_l2|You looked around and the coast is clear. You see Antonio nearby.
        05_cba_l3|The Japanese soldier is still observing your movements from afar, while Antonio is right in front of you.
        // Talk
        05_cba_t0|Talking to the Japanese soldier is futile.
        05_cba_t1|"Nani o itte iru?" said the Japanese soldier in a language%nthat you fail to understand.
        05_cba_t2|The soldier pushed you and stumbled.
        05_cba_t3|"What are you going to do with that rock?" asked Antonio. You shrugged.
        05_cba_t4|"Do you have a plan?" he asked.
        05_cba_t5|"I have a plan, but I don't think I can trust you." said Antonio.
        05_cba_t6|"We can steal one of the keys to set us free and escape." Your new friend suggested.
        // Objects
        05_cba_o0|You hide it in your pocket. You dust off your hands to your jean pockets.
        05_cba_o1|You already have the rock.
        // Interactions
        05_cba_a0|You saw that there is a nearby rock that can be used as a weapon.
        05_cba_a1|Gunshots were heard, you saw a Japanese soldier approaching you. You got hit by the rifle's butt.
        05_cba_a2|I can't do that to a friend.
    end
    // Items
    item
        rock|A rock. What else were you expecting?
    end
    // LGO: Entry
    group $
        print,05_cba_l0
    end
    // LGO: Fallback
    group $_f
        // SWE: 99 - Rock death sequence
        if 2,99
            goto,event_16
        elsif 2,63
            goto,event_18
        else
            goto,~$_f
        end
    end
    // LGO: Talk
    group $$_t
        // SW: 51 - Talk #1 with Soldier
        if !51
            print,05_cba_t0
            set,51,true
            points,add,2
        // SW: 52 - Talk #2 with Soldier
        elsif !52
            print,05_cba_t1
            set,52,true
            points,add,2
        // SW: 53 - Pushed by soldier
        elsif !53
            print,05_cba_t2
            set,53,true
            points,add,2
        // SW: 57 - Enable handling of question about plan
        elsif 54,56,!57
            if_inv rock
                printc,05_cba_t3,2n,05_cba_t4,1n
            else
                print,05_cba_t4
            end
            set,57,true
            points,add,2
        // SWE: 57 - Question about plan (prompt)
        elsif 57,!58
            print,05_cba_t4
        // SWE: 63 - Enabled steal keys plan
        elsif 63,!65
            goto,event_20
        else
            goto,~$$_t
        end
    end
    // LGO: Look
    group $$_l
        // L0: Shown during soldier talks
        if !51,!52,!53
            print,05_cba_l0
        // L1: Shown when player hasn't stood up (on ground)
        elsif 53,!54
            print,05_cba_l1
        // L2: Shown during conversation with Antonio
        elsif 54,!58
            print,05_cba_l2
            // SW: 56 - Allow talk to Antonio
            if !56
                set,56,true
                points,add,5
            end
        // L3: Shown after Japanese approach
        elsif 63,!65
            print,05_cba_l3
        else
            goto,~$$_l
        end
    end
    // LGO: Affirmative
    group $$_aff
        if 57,!58
            goto,event_15a
        else
            goto,$_f
        end
    end
    // LGO: Negative
    group $$_neg
        if 57,!58
            goto,event_15b
        else
            goto,$_f
        end
    end
    // 13: Stand up
    group event_13
        // SW: 54 - Stood up 
        if 53,!54
            print,05_cba_l2
            set,54,true
            points,add,2
        else
            goto,$_f
        end
    end
    // 14: Rock weapon
    group event_14
        // SW: 55 - Rock: can't be picked anymore
        if 54,!55
            if_inv rock
                inv,add,rock
                print,05_cba_o0
                points,add,5
            else
                // Rock was already picked
                print,05_cba_o1
            end
        else
            goto,$_f
        end
    end
    // 15a: YES to plan [P]
    group event_15a
        // Not friends scenario [D]
        if !25
            if_inv rock
                // SW: 99 - Is rock death sequence enabled?
                set,99,true
                // Disable all interactions
                set,2,true
                print,05_cba_d0
            else
                // Plan was refused by Antonio
                print,05_cba_t5
                goto,$_go
            end
        // Friends, success scenario
        else
            goto,event_17
        end
        // SW: 58 - Plan question sequence finished
        set,58,true
    end
    // 15b: NO to plan [P]
    group event_15b
        // Rock without plan [D]
        if_inv rock
            // SW: 99 - Is rock death sequence enabled?
            set,99,true
            // Disable all interactions
            set,2,true
            goto,event_16
        // Just without plan
        else
            // Not friends scenario [D]
            if !25
                // Plan was refused by Antonio
                print,05_cba_t5
                goto,$_go
            // Friends, success scenario
            else
                goto,event_17
            end
        end
        // SW: 58 - Plan question sequence finished
        set,58,true
    end
    // 16: Death by rock [D]
    group event_16
        // SW: 59 - Rock death sequence #1 [Friends]
        if 25,!59
            print,05_cba_d1
            set,59,true
        // SW: 60 - Rock death sequence #2
        elsif !60
            print,05_cba_d2
            set,60,true
        // SW: 61 - Rock death sequence #3
        elsif !61
            print,05_cba_d3
            set,61,true
        // SW: 62 - Rock death sequence #4
        elsif !62
            print,05_cba_d4
            set,62,true
            goto,$_go
        else
            goto,$_f
        end
    end
    // 17: Stealing the keys suggestion
    group event_17
        // SW: 63 - Steal keys plan
        if !63
            print,05_cba_t6
            // Prevent rock from being picked up at this point
            set,55,true
            set,63,true
            // Disable all interactions (Japanese approach)
            set,2,true
            points,add,5
        end
    end
    // 18: Japanese soldier approach
    group event_18
        print,05_cba_a1
        // SW: 64 - Can fight back Japanese soldier
        set,64,true
        // Restore all interactions
        set,2,false
        points,add,5
    end
    // 19a: Fighting back to the Japanese [D]
    group event_19a
        if 64
            print,05_cba_d5
            goto,$_go
        end
    end
    // 19b: Throwing a rock at the Japanese [D]
    group event_19b
        if 64
            if_inv rock
                printc,05_cba_d6,2n,05_cba_d5,1n
                goto,$_go
            else
                goto,$_ms
            end
        end
    end
    // 19c: Killing Antonio [D]
    group event_19c
        if 56
            if !25
                printc,05_cba_d2,2n,05_cba_d7,1n
                goto,$_go
            else
                print,05_cba_a2
            end
        else
            goto,$_ms
        end
    end
    // 19d: Throwing rock at Antonio [D]
    group event_19d
        if 56
            if !25
                printc,05_cba_d8,2n,05_cba_d5,1n
                goto,$_go
            else
                print,05_cba_a2
            end
        else
            goto,$_ms
        end
    end
    // 20: End of scene
    group event_20
        // SW: 65 - Final plan talk
        set,65,true
        points,add,5
        scene,s03_sanfernando_arrival
    end
    // Actions
    action
        get up,stand up,stand,walk up|goto,event_13
        pick rock,take rock,get rock,snatch rock,grasp rock,pull rock,reach rock|goto,event_14
        fight back,fight japanese soldier,fight japanese,fight jap soldier,fight jap,kill japanese soldier,kill japanese,kill jap soldier,kill japs|goto,event_19a
        throw rock,throw rock at japanese soldier,throw rock at jap soldier,throw rock at soldier,trhwo rock at japs|goto,event_19b
        kill antonio,strangle antonio,kick antonio|goto,event_19c
        throw rock at antonio,throw rock antonio|goto,event_19d
        talk antonio,talk to antonio,talk with antonio|goto,$_t
        converse antonio,converse to antonio,converse with antonio|goto,$_t
        chat antonio,chat to antonio,chat with antonio|goto,$_t
        speak antonio,speak to antonio,speak with antonio|goto,$_t
    end
end

/* @FILE: s03_sanfernando.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
     Cecille Marie Milan <clmilan@student.apc.edu.ph>
     Timothy Jay Sayson <tvsayson@student.apc.edu.ph>
*/

/* @NOTES:
   Allocated switches: 100-149
   002: interactions
   005: use alternate talk sequence
   100: Walked to Antonio
   101: Talk then gunfire
   102: Stayed with group
   103: Stayed despite Antonio's death
   104: Hide stop in front message
   105: Allow talk with Japanese
   106: Show bathroom question prompt
   107: Passed all death questions
*/

// San Fernando: Part 01 (Arrival)
scene s03_sanfernando_arrival
    // Strings
    string
        // Look
        06_sfa_l0|Upon arrival in San Fernando, you've noticed that there's many decomposing%ncorpses who died due to several reasons: shot, decapitated, stabbed, among%nothers. Antonio is standing
        06_sfa_l1| from afar.
        06_sfa_l2| in front of you.
        // Talk
        06_sfa_t0|He's too far. You might want to walk towards him.
        06_sfa_t1|You tapped Antonio's shoulders and was about to discuss the plan%nwhen a loud gunfire was heard.%n
        // Walk
        06_sfa_w0|You walked up to Antonio.
        06_sfa_w1|You're already in front of Antonio.
    end
    // LGO: Entry
    group $
        set,5,true
        goto,$_l
    end
    // LGO: Look
    group $$_l
        if !100
            printc,06_sfa_l0,06_sfa_l1,1n
        else
            printc,06_sfa_l0,06_sfa_l2,1n
        end
    end
    // T: to Antonio
    group _t_antonio
        if !0,!2
            // SW: 100 - Walked to Antonio
            if !100
                print,06_sfa_t0
            // SW: 101 - Talk then gunfire
            elsif !101
                print,06_sfa_t1
                points,add,2
                scene,s03_sanfernando_gunfireprompt
            else
                goto,$_msp
            end
        else
            goto,$_f
        end
    end
    // W: to Antonio
    group _w_antonio
        if !100
            print,06_sfa_w0
            set,100,true
            points,add,3
        else
            print,06_sfa_w1
        end
    end
    // Actions
    action
        talk antonio,talk to antonio,talk with antonio|goto,_t_antonio
        converse antonio,converse to antonio,converse with antonio|goto,_t_antonio
        chat antonio,chat to antonio,chat with antonio|goto,_t_antonio
        speak antonio,speak to antonio,speak with antonio|goto,_t_antonio
        walk antonio,walk to antonio|goto,_w_antonio
        run antonio,run to antonio|goto,_w_antonio
        go antonio,go to antonio|goto,_w_antonio
        travel antonio,travel to antonio|goto,_w_antonio
    end
end

// San Fernando: Part 02 (Gunfire prompt)
scene s03_sanfernando_gunfireprompt
    // Strings
    string
        // Death sequences
        07_sfg_d0|"Anyone who tries to escape, like this fellow, will be killed along with his%ngroup of men." Shouted the Japanese general. You can feel the fear in%nthe air as you slowly drifted to peace.
        07_sfg_d1|They killed you and the rest of your group for coming out of your line of men.
        // Look
        07_sfg_l0|The Japanese men were creating groups of 10 and you were separated from Antonio.%n%nWill you run in fear or stay?
        07_sfg_l1|What will you do with the knowledge that your only friend, Antonio, is dying?%nAre you going to avenge him or will you stay in position despite the injustice?
        // Actions
        07_sfg_a0|As the troops began to walk again, you saw one of the Antonio's squadrons%nattempting to run. The Japanese were alerted and rapidly fired bullets at them.
    end
    // LGO: Entry
    group $
        set,5,false
        goto,$_l
    end
    // LGO: Fallback
    group $_f
        print,qs_0
        goto,$_l
    end
    // LGO: Look
    group $$_l
        if !102
            print,07_sfg_l0
        elsif !103
            print,07_sfg_l1
        end
    end
    // LGO: Walk
    group $$_w
        goto,event_23
    end
    // LGO: Direction (Generic)
    group $$_wd
        goto,event_23
    end
    // 22: Stay in place
    group event_22
        // SW: 102 - Stayed with group
        if !102
            printc,07_sfg_a0,2n,07_sfg_l1,1n
            set,102,true
            points,add,5
        // SW: 103 - Stayed despite Antonio's death
        elsif !103
            goto,event_25
        else
            goto,$_msp
        end
    end
    // 23: Run or walk away [D]
    group event_23
        // SWE: 102 - Death when trying to run away
        if !102
            print,07_sfg_d0
            goto,$_go
        else
            goto,$_msp
        end
    end
    // 24: Avenge Antonio [D]
    group event_24
        // SWE: 103 - Death when trying to avenge Antonio
        if !103
            print,07_sfg_d1
            goto,$_go
        else
            goto,$_msp
        end
    end
    // 25: Stayed despite Antonio's death
    group event_25
        points,add,5
        scene,s03_sanfernando_malaria
    end
    // Actions
    action
        stay,stay here,stay in place,stand still,stand here,stand,remain in place,remain here standing,remain here,remain,do not go away,don't go away|goto,event_22
        run away,walk away,go away,travel away,run in fear,run fear,walk in fear,walk fear,go in fear,go fear,travel in fear,travel fear,i am a coward,i'm a coward,coward|goto,event_23
        approach antonio,approach japanese,approach japs,avenge,avenge antonio,fight back,fight japanese soldier,fight japanese,fight jap soldier,fight jap,kill japanese soldier,kill japanese,kill jap soldier,kill japs|goto,event_24
    end
end

// San Fernando: Part 03 (Malaria)
scene s03_sanfernando_malaria
    // Strings
    string
        // Death sequences
        08_sfm_d0|You got stabbed to death by the Japanese men.
        08_sfm_d1|While walking to a nearby tree to pee, you suddenly felt the bullets pass through you.
        08_sfm_d2|Shots were fired.
        // Look
        08_sfm_l0|Antonio's squadron has died. Now, the trek has been taking longer than usual.%nYou might want to take a look around to see what's happening since many%npeople are huddled together.
        08_sfm_l1|You overheard that the Japanese officials have started to question troops if%nthey have caught any diseases since they've started the walk.%n%nThey stopped in front of you.
        // Talk
        08_sfm_t0|"Well, what is it? Are you infected with malaria? Speak up!"%nasked one of the Japanese soldiers.
        08_sfm_t1|"eigo wakkatteru no? kono indo" They patted your head.%n%n"Do you need to use the bathroom?" asked one of the Japanese soldiers.
    end
    // LGO: Entry
    group $
        set,5,false
        if !105
            print,08_sfm_l0
        else
            goto,$$_l
        end
    end
    // LGO: Fallback
    group $_f
        // SWE: 105 - Anything other than no is death
        if 105,!106
            goto,event_26a
        // SWE: 106 - Bathroom question prompt
        elsif 106,!107
            printc,qs_0,1n,08_sfm_t1,1n
        else
            goto,~$_f
        end
    end
    // LGO: Look
    group $$_l
        // SWE: 104 - Hide stop in front message
        if !104
            print,08_sfm_l1
            // SW: 105 - Allow talk with Japanese
            if !105
                set,105,true
                points,add,5
            end
        // SWE: 105 - Malaria question prompt
        elsif 105,!106
            print,08_sfm_t0
        // SWE: 106 - Bathroom question prompt
        elsif 106,!107
            print,08_sfm_t1
        else
            goto,~$$_l
        end
    end
    // LGO: Talk
    group $$_t
        // SWE: 105 - Malaria question prompt
        if 105,!106
            print,08_sfm_t0
            if !104
                // SW: 104 - Other messages would mean death
                set,104,true
                points,add,5
            end
        // SWE: 106 - Bathroom question prompt
        elsif 106,!107
            print,08_sfm_t1
        else
            goto,~$$_t
        end
    end
    // LGO: Affirmative
    group $$_aff
        // Y0: Death from stabbing
        if 104,!106
            goto,event_26a
        // Y1: Death in bathroom
        elsif 106,!107
            goto,event_27a
        else
            goto,$_f
        end
    end
    // LGO: Negative
    group $$_neg
        // N0: Asked for bathroom
        if 104,!106
            goto,event_26b
        // N1: Pushed back to line
        elsif 106,!107
            goto,event_27b
        else
            goto,$_f
        end
    end
    // 26a: Malaria positive [D]
    group event_26a
        print,08_sfm_d0
        goto,$_go
    end
    // 26b: Malaria negative
    group event_26b
        print,08_sfm_t1
        // SW: 106 - Show bathroom question prompt
        set,106,true
        points,add,5
    end
    // 27a: YES to bathroom
    group event_27a
        printr,08_sfm_d0,08_sfm_d1,08_sfm_d2
        goto,$_go
    end
    // 27b: NO to bathroom
    group event_27b
        // SW: 107 - Passed all death questions
        set,107,true
        points,add,5
        scene,s03_sanfernando_final
    end
    // Actions
    action
        talk japanese,talk to japanese,talk with japanese|goto,$_t
        converse japanese,converse to japanese,converse with japanese|goto,$_t
        chat japanese,chat to japanese,chat with japanese|goto,$_t
        speak japanese,speak to japanese,speak with japanese|goto,$_t
        talk japs,talk to japs,talk with japs|goto,$_t
        converse japs,converse to japs,converse with japs|goto,$_t
        chat japs,chat to japs,chat with japs|goto,$_t
        speak japs,speak to japs,speak with japs|goto,$_t
        talk soldier,talk to soldier,talk with soldier|goto,$_t
        converse soldier,converse to soldier,converse with soldier|goto,$_t
        chat soldier,chat to soldier,chat with soldier|goto,$_t
        speak soldier,speak to soldier,speak with soldier|goto,$_t
        talk japanese soldier,talk to japanese soldier,talk with japanese soldier|goto,$_t
        converse japanese soldier,converse to japanese soldier,converse with japanese soldier|goto,$_t
        chat japanese soldier,chat to japanese soldier,chat with japanese soldier|goto,$_t
        speak japanese soldier,speak to japanese soldier,speak with japanese soldier|goto,$_t
        talk jap soldier,talk to jap soldier,talk with jap soldier|goto,$_t
        converse jap soldier,converse to jap soldier,converse with jap soldier|goto,$_t
        chat jap soldier,chat to jap soldier,chat with jap soldier|goto,$_t
        speak jap soldier,speak to jap soldier,speak with jap soldier|goto,$_t
    end
end

// San Fernando: Part 04 (Final)
scene s03_sanfernando_final
    // Strings
    string
        // Look
        09_sff_l0|They pushed you back to the line where your group was. "Time to start marching %nnorth, we stop when it's sunrise!" said one of the Japanese soldiers.
        // Interactions
        09_sff_a0|Along the way to Camp O'Donnell, you saw piles of decapitated bodies of people%nwho had suffered from malaria.
    end
    // LGO: Entry
    group $
        print,09_sff_l0
        set,5,false
    end
    // LGO: Look
    group $$_l
        print,09_sff_l0
    end
    // LGO: Direction (North)
    group $$_wd_n
        print,09_sff_a0
        points,add,5
        scene,s04_donnell_arrival
    end
end

/* @FILE: s04_campdonnell.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
     Rachel Lauren Manlapig <rcmanlapig@student.apc.edu.ph>
     Georgette Tulod <gntulod@student.apc.edu.ph>
*/

/* @NOTES:
   Allocated switches: 150-199
   002: interactions
   005: use alternate talk sequence
   150: Begin food prompt
   151: Enter the room prompt
   152: Moved to room assignment
   153: Moved to hunting assignment
   154: Done hunting chickens
   155: Refused to eat the chicken
   156: Returned to the camp

   157: Death by cleaning the fence sequence #1
   158: Death by cleaning the fence sequence #2
   159: Death by cleaning the fence sequence #3
   160: Death by cleaning the fence sequence #4

   161: Continued resting
   162: Asked soldier about the situation
   163: Went to dinner
   164: Show eat dinner hint
   165: Ate the chicken (for real)
   166: Done mumbling about Japanese
   167: Stanley's challenge
   168: Declined Stanley's challenge
   169: Stanley talk sequence #1
   170: Stanley talk sequence #2
   171: Stanley talk sequence #3
   172: Look around sequence #1
   173: Look around sequence #2
   174: Look around sequence #3
   175: Narration sequence #1
   176: Narration sequence #2

   190: Talked to soldier David [@157]

   197: Death by cleaning the fence
   198: Death by sleeping
   199: Death by food stealing
*/

// Camp O'Donnell: Part 01 (Arrival)
scene s04_campdonnell_arrival
    //===============
    // @DEF duplicated groups from s02_cabcaben_arrival
    // 19a: Fighting back to the Japanese [D]
    group event_19a
        print,05_cba_d5
        goto,$_go
    end
    // 19b: Throwing a rock at the Japanese [D]
    group event_19b
        if_inv rock
            printc,05_cba_d6,2n,05_cba_d5,1n
            goto,$_go
        else
            goto,$_ms
        end
    end
    // @END
    //===============

    // Strings
    string
        // Death sequences
        10_cda_d0|You tried to reach for the food container one step at a time...
        10_cda_d1|"You're not going to follow my orders?" shouted the Japanese soldier. He drew%nhis gun, pointed it your head, and without thinking twice, pulled the trigger.
        // XXX: borrowed from 03_pmh_t0
        10_cda_d2|"Where do you think you're going?" The Japanese soldier yelled.
        // Look
        10_cda_l0|May 1942. You've finally reached Camp O'Donnell, a prison camp that used to be a%ntraining facility before the Japanese occupation. After the long walk, the%nprisonsers of war (POWs) were asked to line up once again. A Japanese soldier%nnamed 'The Scarecrow' shouted, "Keep standing there or die."
        10_cda_l1|We stood under the sun, exhausted and famished. I tried to look around for food%nor water without catching anyone's attention. I found a clear container filled%nwith food. Should I take it?
        10_cda_l2|Filipino and American POWs stood under the scorching heat for two long hours.%n"Enter your designated rooms and do the tasks assigned to you,"%nshouted the Japanese soldier.
        // Talk
        10_cda_t1| Standing still is probably%nthe best thing I can do if I'd want to survive.
        // Interactions
        10_cda_a0|My hunger can wait.
    end
    // LGO: Entry
    group $
        set,5,false
        print,10_cda_l0
    end
    // LGO: Fallback
    group $_f
        // SWE: 199 - death by food stealing
        if 2,199
            goto,event_29
        else
            goto,~$_f
        end
    end
    // LGO: Talk
    group $$_t
        if !150;!151
            printc,t_10,10_cda_t1,1n
        elsif !152
            print,t_10
        else
            goto,~$$_t
        end
    end
    // LGO: Look
    group $$_l
        if !150
            print,10_cda_l0
        elsif 150,!151
            print,10_cda_l1
        elsif 151,!152
            print,10_cda_l2
        else
            goto,~$$_l
        end
    end
    // LGO: Walk
    group $$_w
        goto,event_29
    end
    // LGO: Objects
    group $$_o
        // E: Taking objects isn't deadly anymore
        if !150
            goto,event_29
        else
            goto,~$$_o
        end
    end
    // LGO: Direction (Generic)
    group $$_wd
        goto,event_29
    end
    // LGO: Affirmative
    group $$_aff
        // E: Took the food [D]
        if 150,!151
            goto,event_30
        // E: Accepted room assignments
        elsif 151,!152
            goto,event_32a
        else
            goto,$_f
        end
    end
    // LGO: Negative
    group $$_neg
        // E: Refused to stand under the sun
        if !150
            goto,event_29
        // E: Hunger can wait
        elsif 150,!151
            goto,event_31
        // E: Defied room orders
        elsif 151,!152
            goto,event_32b
        else
            goto,$_f
        end
    end
    // 28: Stayed here
    group event_28
        // E: Food is available
        if !150
            print,10_cda_l1
            // SW: 150 - Begin food prompt
            set,150,true
        // E: Hunger can wait
        elsif 150,!151
            goto,event_31
        // E: Defied room orders
        elsif 151,!152
            goto,event_32b
        // E: Inaccessible
        else
            goto,$_msp
        end
    end
    // 29: Defied Japanese orders [D]
    group event_29
        printr,10_cda_d1,10_cda_d2
        goto,$_go
    end
    // 30: Took the food [D]
    group event_30
        if 150,!151
            print,10_cda_d0
            // SW: 199 - Death by food stealing
            set,199,true
            // Disable all interactions
            set,2,true
        else
            goto,$_msp
        end
    end
    // 31: Endure hunger
    group event_31
        if 150,!151
            printc,10_cda_a0,2n,10_cda_l2,1n
            // SW: 151 - Enter the room prompt
            set,151,true
            points,add,5
        else
            goto,$_msp
        end
    end
    // 32a: Accepted room and task assignments
    group event_32a
        // SW: 152 - Moved to room assignment
        set,152,true
        points,add,5
        scene,s04_campdonnell_room
    end
    // 32b: Defied room and task orders [D]
    group event_32b
        print,10_cda_d1
        goto,$_go
    end
    // Actions
    action
        stay,stay here,stay in place,stand still,standing still,stand here,stand,remain in place,remain here standing,remain here,remain,do not go away,don't go away,don't go in,do not go in|goto,event_28
        run away,walk away,go away,travel away,run in fear,run fear,walk in fear,walk fear,go in fear,go fear,travel in fear,travel fear,i am a coward,i'm a coward,coward|goto,event_29
        // Food-specific
        food,pick food,take food,get food,snatch food,grasp food,pull food,reach food|goto,event_30
        // Walk-related
        the room,room,enter room,enter the room|goto,event_32a
        walk room,walk to room|goto,event_32a
        run room,run to room|goto,event_32a
        go room,go to room|goto,event_32a
        travel room,travel to room|goto,event_32a
        // Imported actions
        fight,fight back,fight japanese soldier,fight japanese,fight jap soldier,fight jap,kill,kill japanese soldier,kill japanese,kill jap soldier,kill japs|goto,event_19a
        throw rock,throw rock at japanese soldier,throw rock at jap soldier,throw rock at soldier,trhwo rock at japs|goto,event_19b
    end
end

// Camp O'Donnell: Part 02 (Room)
scene s04_campdonnell_room
    // Strings
    string
        // Death sequences
        // XXX: borrowed from 10_cda_d1
        11_cdr_d0|"You're not going to follow my orders?" shouted the Japanese soldier. He drew%nhis gun, pointed it your head, and without thinking twice, pulled the trigger.
        // Look
        11_cdr_l0|You've heard them.%n%nWith heavy steps, another Japanese soldier entered the room. You were assigned%nto hunt for food. At this point, you didn't know what you will die of first,%nhunger or exhaustion. You had to weigh your options.%n%nYou either take a rest now or look for food.
        // Interactions
        11_cdr_a0|You're tired and sat near one of the room's corners to rest. You were startled%nwhen a Japanese soldier entered. He saw you resting, defying their orders.
    end
    // LGO: Entry
    group $
        set,5,false
        print,11_cdr_l0
    end
    // LGO: Fallback
    group $_f
        // SWE: 198 - Death by sleeping
        if 2,198
            goto,event_33b
        else
            goto,~$_f
        end
    end
    // LGO: Talk
    group $$_t
        print,t_10
    end
    // LGO: Look
    group $$_l
        print,11_cdr_l0
    end
    // 33a: Take a rest [D]
    group event_33a
        print,11_cdr_a0
        // SW: 198 - Death by sleeping
        set,198,true
        // Disable all interactions
        set,2,true
    end
    // 33b: Death by sleeping [D]
    group event_33b
        print,11_cdr_d0
        goto,$_go
    end
    // 34: Look for food
    group event_34
        // SW: 153 - Moved to hunting assignment
        set,153,true
        points,add,5
        scene,s04_campdonnell_hunting
    end
    // Actions
    action
        take a rest now,take a rest,rest now,rest,take a nap,nap,nap now,sleep,sleep floor,sleep corner,go sleep,go rest,go nap|goto,event_33a
        look for food,look food,food,search for food,search food,scavenge for food,scavenge food,hunt for food,hunt food|goto,event_34
    end
end

// Camp O'Donnell: Part 03 (Hunting)
scene s04_campdonnell_hunting
    // Strings
    string
        // Death sequences
        12_cdh_d0|It escapes and runs away. You go back empty-handed, tired, and weak.
        12_cdh_d1|Driven by hunger, you took a bite of the raw meat. The meat tasted bland yet%nyou still swallowed it after chewing. Your throat is dry and it's a chore to%nswallow. Walking two-three steps, you feel bile rising from your stomach and you%npuke. Your vomit is mixed with blood.
        // Look
        12_cdh_l0|With every crevice of your body screaming from overuse, you endured the pain,%nstood up to hunt for food, and explored the area slowly. Your muscles burn%nfrom moving, until your attention was taken by a wild chicken.
        12_cdh_l1|The chicken is stationary. You might want to hunt and kill it, or let it escape.
        12_cdh_l2|You've already killed and taken the chickens.
        12_cdh_l3|You have the choice of eating the chicken raw, or leaving it alone.
        // Talk
        12_cdh_t0|You can't talk to chickens.
        12_cdh_t1|You can't talk to dead chickens.
        // Actions
        12_cdh_a0|Despite the short struggle between you and the chicken, you were able to catch%nit from its neck without getting hurt and promptly killed it. The energy it%ntook, however, made you vomit blood. You feel weak but you continued hunting.%nWith four dead chickens in your hand, the intrusive thought of having to share%nyour hunt comes into your mind.
        12_cdh_a1|You can't eat what you don't have.
        12_cdh_a2|You can't eat the chicken without killing it, silly.
    end
    // Items
    item
        chicken|A dead chicken. Poor guy.
    end
    // LGO: Entry
    group $
        set,5,true
        goto,$$_l
    end
    // LGO: Look
    group $$_l
        if !154
            print,12_cdh_l0
        elsif 154,!155
            printc,12_cdh_l2,2n,12_cdh_l3,1n
        else
            goto,~$$_l
        end
    end
    // L: Chicken
    group _l_chicken
        if_inv !chicken
            print,12_cdh_l1
        else
            print,12_cdh_l2
        end
    end
    // T: Chicken
    group _t_chicken
        if 154
            print,12_cdh_t1
        else
            print,12_cdh_t0
        end
    end
    // 35a: Kill chicken
    group event_35a
        if !154
            printc,12_cdh_a0,2n,12_cdh_l3,1n
            inv,add,chicken
            // SW: 154 - Done hunting chickens
            set,154,true
            points,add,5
        else
            print,12_cdh_l2
        end
    end
    // 35b: Leave chicken alone [D]
    group event_35b
        if !154
            print,12_cdh_d0
            goto,$_go
        else
            print,12_cdh_l2
        end
    end
    // 36a: Eat the chicken [D]
    group event_36a
        if 154
            inv,rm,chicken
            print,12_cdh_d1
            goto,$_go
        else
            print,12_cdh_a2
        end
    end
    // 36b: Don't eat the chicken
    group event_36b
        if 154
            // SW: 155 - Refused to eat the chicken
            set,155,true
            points,add,5
            scene,s04_campdonnell_camp_returnprompt
        else
            if_inv !chicken
                print,12_cdh_a1
            else
                goto,$_ms
            end
        end
    end
    // 35b/36b: Dual action
    group event_d_35b_36b
        if !154
            goto,event_35b
        else
            goto,event_36b
        end
    end
    // Actions
    action
        // Hunting actions
        chicken,look chicken,view chicken,see chicken,check chicken|goto,_l_chicken
        talk chicken,talk to chicken,talk with chicken|goto,_t_chicken
        converse chicken,converse to chicken,converse with chicken|goto,_t_chicken
        chat chicken,chat to chicken,chat with chicken|goto,_t_chicken
        speak chicken,speak to chicken,speak with chicken|goto,_t_chicken
        kill,kill the chicken,kill chicken,hunt,hunt the chicken,hunt chicken,hunt and kill,hunt and kill the chicken,hunt and kill chicken,hunt kill chicken,hunt for more chicken,hunt for more,hunt more chicken|goto,event_35a
        do not kill the chicken,don't kill the chicken,don't kill chicken,allow the chicken to escape,allow chicken to escape,allow chicken escape,chicken escape,escape chicken|goto,event_35b
        // Dual meaning actions
        leave,leave the chicken alone,leave chicken alone,leave chicken,leaving it alone,leave it alone,leave it,stay here,stay,do not move,don't move,no move|goto,event_d_35b_36b
        // Eat or leave chicken alone actions
        cook the chicken,cook chicken,cook,eat the chicken raw,eat chicken raw,eat it raw,eat the chicken,eat chicken,eating the chicken raw,eating chicken raw,eating chicken|goto,event_36a
        do not eat the chicken,do not eat chicken,don't eat the chicken,don't eat chicken,don't eat,don't eat it raw,don't eat it,no eat,no chicken eat,no chicken eat raw|goto,event_36b
    end
end

// Camp O'Donnell: Part 04 (Return to Camp Prompt)
scene s04_campdonnell_camp_returnprompt
    // Strings
    string
        // Death sequences
        13_rtc_d0|Feeling unwell, you never went back to camp. While resting under a tree,%na scout found you and killed you out of irritation.%n%n"Less bodies to feed," the scout reasoned to himself.
        // Look
        13_rtc_l0|You hesitated in eating the chicken while you walked closer back to the camp.%nHuman greed and fear of losing the chance to eat what you've hunted pushed you%nto take a bite of the raw meat anyway. It tasted bland.%n%nYou walked three steps towards camp, but you feel the bile rising from your%nstomach and puked. Your vomit is mixed with blood.
        13_rtc_l1|You've the option of:%n * returning to the camp immediately, or%n * taking a quick nap and rest.
    end
    // LGO: Entry
    group $
        set,5,false
        printc,13_rtc_l0,2n,13_rtc_l1,1n
    end
    // LGO: Look
    group $$_l
        print,13_rtc_l1
    end
    // 37: Return to camp
    group event_37
        // SW: 156 - Returned to the camp
        set,156,true
        points,add,5
        scene,s04_campdonnell_camp_helpsoldier
    end
    // 38: Take a nap
    group event_38
        print,13_rtc_d0
        goto,$_go
    end
    // Actions
    action
        returning to camp immediately,returning camp immediately,returning camp,return to camp, return camp,return,return now|goto,event_37
        walk camp,walk to camp|goto,event_37
        run camp,run to camp|goto,event_37
        go camp,go to camp|goto,event_37
        travel camp,travel to camp|goto,event_37
        
        taking a quick nap and rest,taking a quick nap,take a nap,take nap,nap,take quick nap,quick nap,rest,sleep,quick rest,rest now|goto,event_38
    end
end

// Camp O'Donnell: Part 05 (Help Soldier Prompt)
scene s04_campdonnell_camp_helpsoldier
    // Strings
    string
        // Death sequences
        // XXX: borrowed from 03_pmh_t0
        14_chs_d0|"Where do you think you're going?" The Japanese soldier yelled.
        14_chs_d1|Both of you were speechless.
        14_chs_d2|"This requires no explanation at all," said the Japanese soldier while smiling.
        // XXX: borrowed from 10_cda_d1
        14_chs_d3|He drew his gun, pointed it your head first, and without thinking twice, pulled the trigger.
        // Look
        14_chs_l0|After the hunt, you handed over the dead chickens and went inside your room.%nYou rested with the remaining troops until something came up.
        14_chs_l1|You might want to consider talking to the Filipino soldier first.
        // Talk
        14_chs_t0|"Will you help me in cleaning up the fence?" asked David, one of the soldiers.
        14_chs_t1|"Thanks!" said David. Both of you proceeded to go outside...
    end
    // LGO: Entry
    group $
        set,5,true
        printc,14_chs_l0,2n,14_chs_l1,1n
    end
    // LGO: Fallback
    group $_f
        if 2,197
            // SW: 157 - Death by cleaning the fence sequence #1
            if !157
                print,14_chs_d0
                set,157,true
            // SW: 158 - Death by cleaning the fence sequence #2
            elsif !158
                print,14_chs_d1
                set,158,true
            // SW: 159 - Death by cleaning the fence sequence #3
            elsif !159
                print,14_chs_d2
                set,159,true
            // SW: 160 - Death by cleaning the fence sequence #4
            elsif !160
                print,14_chs_d3
                set,160,true
                goto,$_go
            // This shouldn't be reached. Oh well...
            else
                goto,$_go
            end
        else
            goto,~$_f
        end
    end
    // LGO: Look
    group $$_l
        print,14_chs_l1
    end
    // LGO: Affirmative
    group $$_aff
        if 190
            goto,event_39a
        else
            print,14_chs_l1
        end
    end
    // LGO: Negative
    group $$_neg
        if 190
            goto,event_39b
        else
            print,14_chs_l1
        end
    end
    // T: Soldier
    group _t_soldier
        print,14_chs_t0
        // SW: 190 - Talked to soldier David
        if !190
            set,190,true
            points,add,2
        end
    end
    // 39a: Help the soldier [D]
    group event_39a
        print,14_chs_t1
        // SW: 197 - Death by cleaning the fence
        set,197,true
        // Disable all interactions
        set,2,true
    end
    // 39b: Continue resting
    group event_39b
        // SW: 161 - Continued resting
        set,161,true
        points,add,3
        scene,s04_campdonnell_camp_shooting
    end
    // Actions
    action
        talk soldier,talk to soldier,talk with soldier|goto,_t_soldier
        converse soldier,converse to soldier,converse with soldier|goto,_t_soldier
        chat soldier,chat to soldier,chat with soldier|goto,_t_soldier
        speak soldier,speak to soldier,speak with soldier|goto,_t_soldier
        talk troop,talk to troop,talk with troop|goto,_t_soldier
        converse troop,converse to troop,converse with troop|goto,_t_soldier
        chat troop,chat to troop,chat with troop|goto,_t_soldier
        speak troop,speak to troop,speak with troop|goto,_t_soldier
        talk david,talk to david,talk with david|goto,_t_soldier
        converse david,converse to david,converse with david|goto,_t_soldier
        chat david,chat to david,chat with david|goto,_t_soldier
        speak david,speak to david,speak with david|goto,_t_soldier
    end
end

// Camp O'Donnell: Part 06 (Shooting)
scene s04_campdonnell_camp_shooting
    // Strings
    string
        // Look
        15_ccs_l0|You refused David's request and you continued to take a rest.%nSuddenly, you heard multiple gunshots being fired.%n%nA fellow troop just entered the room, seemingly dismayed.
        15_ccs_l1|You should probably go and eat dinner now.
        // Hints
        15_ccs_h0|Hint: Type 'eat dinner' or any of the 'walk' keywords.
        // Talk
        15_ccs_t0|"David was shot near the fence. The Japanese assumed he was escaping," he said.%nAghast, and as you tried to process the soldier's answer,%n'The Scarecrow' entered the room and asked everyone to gather up for dinner.
        // Walk
        15_ccs_w0|You walked outside your room, towards where everyone is 'eating'.
    end
    // LGO: Entry
    group $
        set,5,true
        print,15_ccs_l0
    end
    // LGO: Look
    group $$_l
        if !162
            print,15_ccs_l0
        elsif !163
            print,15_ccs_l1
            if !164
                // SW: 164 - Show eat dinner hint
                set,164,true
                points,add,5
            else
                print,15_ccs_h0
            end
        else
            goto,~$$_l
        end
    end
    // LGO: Walk
    group $$_w
        if 162
            print,15_ccs_w0
            // SW: 163 - Went to dinner
            set,163,true
            points,add,5
            scene,s04_campdonnell_camp_dinner
        else
            goto,~$$_w
        end
    end
    // LGO: Direction (Generic)
    group $$_wd
        if 162
            goto,$$_w
        else
            goto,~$$_wd
        end
    end
    // T: Soldier
    group _t_soldier
        if !162
            print,15_ccs_t0
            // SW: 162 - Asked soldier about the situation
            set,162,true
            points,add,5
        else
            print,t_10
        end
    end
    // Actions
    action
        talk soldier,talk to soldier,talk with soldier|goto,_t_soldier
        converse soldier,converse to soldier,converse with soldier|goto,_t_soldier
        chat soldier,chat to soldier,chat with soldier|goto,_t_soldier
        speak soldier,speak to soldier,speak with soldier|goto,_t_soldier
        talk troop,talk to troop,talk with troop|goto,_t_soldier
        converse troop,converse to troop,converse with troop|goto,_t_soldier
        chat troop,chat to troop,chat with troop|goto,_t_soldier
        speak troop,speak to troop,speak with troop|goto,_t_soldier
        dinner,eat dinner,gather for dinner,gather,gather up,gather up for dinner|goto,$_w
    end
end

// Camp O'Donnell: Part 07 (Dinner)
scene s04_campdonnell_camp_dinner
    //===============
    // @DEF duplicated groups from 2_egs.gs
    // Interaction: swearing
    group $$_swear
        goto,event_41a
    end
    group $_swear
        if !0,!2
            goto,$$_swear
        else
            goto,$_f
        end
    end
    // @END
    //===============

    // Strings
    string
        // Death sequences
        // XXX: borrowed from 14_chs_d2
        16_ccd_d0|"This requires no explanation at all," said the Japanese soldier while smiling.
        // XXX: borrowed from 10_cda_d1/14_chs_d3
        16_ccd_d1|He drew his gun, pointed it your head first, and without thinking twice, pulled the trigger.
        // Look
        16_ccd_l0|The rest of the POWs sit on the grass, while some are starting to eat.%nYou were offered food: the chicken that you killed earlier.
        16_ccd_l1|Stanley is musing about the Japanese.
        // Talk
        16_ccd_t0|"Aren't you going to eat?" asked Stanley.
        16_ccd_t1|While eating, the troops were mumbling about the Japanese soldiers.%nMocking them with names.
        16_ccd_t2|A Japanese soldier walked near us, then Stanley shouted,%n "Good evening, sh*t face!" The soldier ignored him as if nothing happened.
        16_ccd_t3|"You should try shouting or swearing, it calms the nerves," Stanley exclaimed.
        16_ccd_t4|"You're a coward!" Stanley shouted. You resumed eating your chicken.
        16_ccd_t5|"Why are you doing this?" you asked Stanley.
        16_ccd_t6|"They killed my twin brother." He muttered, smiling.%nYou were surprised and tried to convince him to stop but...
        16_ccd_t7|He continued insulting the Japanese soldiers until one got tired with him...%nYou simply looked away and accepted that there really isn't anything you can do.
        // Hints
        16_ccd_h0|Hint: Type 'swear', 'shout', or any swear keywords.
        // Actions
        16_ccd_a0|You ate the chicken. Still tastes bland, but still better than nothing.
        16_ccd_a1|You already ate your chicken and you don't want any more food.
    end
    // LGO: Entry
    group $
        set,5,true
        print,16_ccd_l0
    end
    // LGO: Look
    group $$_l
        if !167
            print,16_ccd_l0
        else
            print,16_ccd_l1
        end
    end
    // LGO: Talk
    group $$_t
        if !165
            print,16_ccd_t0
        elsif !166
            print,16_ccd_t1
            // SW: 166 - Done mumbling about Japanese
            set,166,true
            points,add,2
        elsif !167
            printc,16_ccd_t2,1n,16_ccd_t3,1n
            // SW: 167 - Stanley's challenge
            set,167,true
            points,add,2
        elsif !168
            printc,16_ccd_t3,1n,16_ccd_h0,1n
        elsif !169
            print,16_ccd_t5
            // SW: 169 - Stanley talk sequence #1
            set,169,true
            points,add,2
        elsif !170
            print,16_ccd_t6
            // SW: 170 - Stanley talk sequence #2
            set,170,true
            points,add,2
        elsif !171
            print,16_ccd_t7
            // SW: 171 - Stanley talk sequence #3
            set,171,true
            points,add,2
            scene,s04_campdonnell_camp_lookaround
        else
            print,t_10
        end
    end
    // LGO: Affirmative
    group $$_aff
        goto,event_41a
    end
    // LGO: Negative
    group $$_neg
        goto,event_41b
    end
    // 40: Eat food
    group event_40
        if !165
            printc,16_ccd_a0,2n,16_ccd_t1,1n
            inv,rm,chicken
            // SW: 165 - Ate the chicken (for real)
            set,165,true
            points,add,3
        else
            print,16_ccd_a1
        end
    end
    // 41: Swore to Stanley's challenge [D]
    group event_41a
        if 167,!168
            printc,16_ccd_d0,2n,16_ccd_d1,1n
            goto,$_go
        else
            goto,$_f
        end
    end
    // 42: No to swearing
    group event_41b
        if 167,!168
            print,16_ccd_t4
            // SW: 168 - Declined Stanley's challenge
            set,168,true
            points,add,2
        else
            goto,$_f
        end
    end
    // Actions
    action
        eat,eat chicken,eat dinner,eat now,eat food|goto,event_40
        // Fallback for absence of easter eggs game script
        accept the challenge,accept challenge|goto,event_41a
        good evening sh*t face,good evening sh*t|goto,event_41a
        try shouting,shouting,shout,try swearing,swear,swear now,sh*t face,s**t face|goto,event_41a
        no to swearing,do not try,don't try,I won't,I would not,I will not|goto,event_41b
        talk soldier,talk to soldier,talk with soldier|goto,$_t
        converse soldier,converse to soldier,converse with soldier|goto,$_t
        chat soldier,chat to soldier,chat with soldier|goto,$_t
        speak soldier,speak to soldier,speak with soldier|goto,$_t
        talk troop,talk to troop,talk with troop|goto,$_t
        converse troop,converse to troop,converse with troop|goto,$_t
        chat troop,chat to troop,chat with troop|goto,$_t
        speak troop,speak to troop,speak with troop|goto,$_t
        talk stanley,talk to stanley,talk with stanley|goto,$_t
        converse stanley,converse to stanley,converse with stanley|goto,$_t
        chat stanley,chat to stanley,chat with stanley|goto,$_t
        speak stanley,speak to stanley,speak with stanley|goto,$_t
    end
end

// Camp O'Donnell: Part 08 (Look around scene)
scene s04_campdonnell_camp_lookaround
    // Strings
    string
        // Look
        17_ccl_l0|Should you look around?
        17_ccl_l1|The night was quiet and pathetic. You saw nothing interesting.
        17_ccl_l2|You see four dead American prisoners of war, in the corner of your eyes.%nYou swear he was just alive yesterday.%n%nEveryone is dying like flies. You wonder if you'd still be alive in the coming%ndays, when there isn't even anything worth living for.
        17_ccl_l3|American POWs walk weakly in the distance, escorted by Japanese soldiers.%nYou wonder if they are going to be tortured or moved into another camp.
        17_ccl_l4|Your eyes feel heavy.
        17_ccl_l5|You've the option of:%n * fighting to stay awake, or%n * sleep.
        // Actions
        17_ccl_a0|You sleep on the ground for the night and wake up seeing Japanese soldiers.%nThey are frantically running around.
        17_ccl_a1|You tried to stay awake but fell asleep due to exhaustion.%n%nYou never woke up again.
    end
    // LGO: Entry
    group $
        print,17_ccl_10
    end
    // LGO: Look
    group $$_l
        if !172
            print,17_ccl_l1
            // SW: 172 - Look around sequence #1
            set,172,true
            points,add,2
        elsif !173
            print,17_ccl_l2
            // SW: 173 - Look around sequence #2
            set,173,true
            points,add,2
        elsif !174
            printc,17_ccl_l3,2n,17_ccl_l4,1n
            // SW: 174 - Look around sequence #33
            set,174,true
            points,add,2
        else
            printc,17_ccl_l4,2n,17_ccl_l5,1n
        end
    end
    // 43: Sleep
    group event_43
        if 172,173,174
            print,17_ccl_a0
            points,add,2
            scene,s04_campdonnell_liberation
        else
            goto,$_msp
        end
    end
    // 44: Fight to stay awake [D]
    group event_44
        if 172,173,174
            print,17_ccl_a1
            goto,$_go
        else
            goto,$_msp
        end
    end
    // Actions
    action
        sleep,sleep now,take a rest,take rest,rest|goto,event_43
        fight to stay awake,fight stay awake,stay awake,fight awake,awake|goto,event_44
    end
end

// Camp O'Donnell: Part 09 (Liberation)
scene s04_campdonnell_liberation
    // Strings
    string
        // Narration fallback
        18_fre_f0|Seeing another dead body right beside you made you wonder how%nyou will die: will you be tortured to death, die of starvation, or in the hands%nof the Japanese. The air smells disgusting as able-bodied POWs and soldiers burn%nthe dead bodies. This goes on for months.%n%nSomewhere, American and Japanese generals have sat onto a large table.
        18_fre_f1|They are here to discuss the surrender of the Philippines. A map was taken out%nfrom the hands of the Japanese Generals. You are curious of what it looks like.
        18_fre_f2|It seems that the war outside the Philippines has shifted unfavorably to the%nJapanese. After months and months of suffering and death, Camp O’Donnell and the%nPOWs it held was liberated from the Japanese.
    end
    // LGO: Entry
    group $
        print,18_fre_f0
        // Disable all interactions
        set,2,true
    end
    // LGO: Fallback
    group $_f
        goto,event_45
    end
    // 45: Narration of the End of War
    group event_45
        if !175
            print,18_fre_f1
            // SW: 175 - Narration sequence #1
            set,175,true
            points,add,2
        elsif !176
            print,18_fre_f2
            // SW: 176 - Narration sequence #2
            set,176,true
            // Enable all interactions
            set,2,false
            // END THE GAME!
            scene,s05_end
        else
            goto,$_f
        end
    end
end

/* @FILE: s05_end.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
*/

/* @NOTES:
   Allocated switches: 200-299
*/

// The End
scene s05_end
    // Strings
    string
        // Look
        99_end_l0|1945, after the long march, POWs are now free from the hands of the Japanese.%nYou were filled with glad, hope, and liberty. You find yourself weeping after%nthe miserable and tormenting walk. The cruelty finally came to an end.
        99_end_a0|You may type `quit` to quit the game.
    end
    // LGO: Entry
    group $
        set,0,true
        printc,99_end_l0,2n
        inv,list
        points,list
        printc,1n,99_end_a0,1n
    end
end

