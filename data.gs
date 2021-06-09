#< @FILE: 0_prefs.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>, June 2021
#>

#------------------------------------------------------------------------------
# Preferences
#------------------------------------------------------------------------------

maxpoints 200
switches 3000

#< @FILE: 1_platform.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>, June 2021
#>

#------------------------------------------------------------------------------
# Strings
#------------------------------------------------------------------------------

# ASCII color codes
string
    # Common
    @_|\e
    @CLS|\e[H\e[2J
    @UE|\e[4m
    @UD|\e[24m
    @BE|\e[1m
    @BD|\e[21m
    # Regular text
    @BLK|\e[0;30m
    @RED|\e[0;31m
    @GRN|\e[0;32m
    @YEL|\e[0;33m
    @BLU|\e[0;34m
    @MAG|\e[0;35m
    @CYN|\e[0;36m
    @WHT|\e[0;37m
    # Regular bold text
    @BBLK|\e[1;30m
    @BRED|\e[1;31m
    @BGRN|\e[1;32m
    @BYEL|\e[1;33m
    @BBLU|\e[1;34m
    @BMAG|\e[1;35m
    @BCYN|\e[1;36m
    @BWHT|\e[1;37m
    # Regular underline text
    @UBLK|\e[4;30m
    @URED|\e[4;31m
    @UGRN|\e[4;32m
    @UYEL|\e[4;33m
    @UBLU|\e[4;34m
    @UMAG|\e[4;35m
    @UCYN|\e[4;36m
    @UWHT|\e[4;37m
    # Regular background
    @BLKB|\e[40m
    @REDB|\e[41m
    @GRNB|\e[42m
    @YELB|\e[43m
    @BLUB|\e[44m
    @MAGB|\e[45m
    @CYNB|\e[46m
    @WHTB|\e[47m
    # High intensty background 
    @BLKHB|\e[0;100m
    @REDHB|\e[0;101m
    @GRNHB|\e[0;102m
    @YELHB|\e[0;103m
    @BLUHB|\e[0;104m
    @MAGHB|\e[0;105m
    @CYNHB|\e[0;106m
    @WHTHB|\e[0;107m
    # High intensty text
    @HBLK|\e[0;90m
    @HRED|\e[0;91m
    @HGRN|\e[0;92m
    @HYEL|\e[0;93m
    @HBLU|\e[0;94m
    @HMAG|\e[0;95m
    @HCYN|\e[0;96m
    @HWHT|\e[0;97m
    # Bold high intensity text
    @BHBLK|\e[1;90m
    @BHRED|\e[1;91m
    @BHGRN|\e[1;92m
    @BHYEL|\e[1;93m
    @BHBLU|\e[1;94m
    @BHMAG|\e[1;95m
    @BHCYN|\e[1;96m
    @BHWHT|\e[1;97m
end

# Common messages
string
    # Fallback
    f_1|I don't understand that!
    f_2|I don't know that word.
    f_3|What?
    f_4|You're confusing!
    # Talk
    t_1|There's nobody in here.
    t_2|There's no one to talk to.
    # Walk
    w_1|Where?
    w_2|May I know which direction?
    # Look/View
    l_1|There's nothing here.
    l_2|I don't know what you're looking for.
    l_3|What are you looking for?
    l_4|See what exactly?
    # Taking objects
    o_1|Take what?
    o_2|I don't see that object here.
    o_3|I'm not a magician.
    o_4|I can't pick something that isn't here.
    # Inventory
    i_1|This item is already in your inventory!
    i_2|This item is NOT in your inventory!
    i_3|You only have one item in your inventory:
    i_4|You have %s items in your inventory:%n
    i_5|%s: %s%n
    i_6|Your inventory is empty!
    # Points
    p_1|You currently have %s of %s points.%n
    # Save/Load Game
    sl_1|Enter the name of your saved game:
    sl_2|Invalid name.
    sl_3|Name too long! Try a shorter name for your saved game.
    sl_4|The specified saved game was not found.
    sl_5|Your game has been loaded!
    sl_6|Your game cannot be saved.
    sl_7|Your game has been saved!
    # Game over
    go_0|Game over.
    go_1|Better luck next time!
    go_2|Perhaps you'll fare better if you restart.
    go_3|You might have missed something, think about it. Seriously.
    go_4|Look at the time! Sleep now, and try again in the morning.
end

#------------------------------------------------------------------------------
# Command groups
#------------------------------------------------------------------------------

#<
  Reserved switches:
    0: disable all reserved global command groups
    1: inventory and points access
    2: interactions
    3: game state load/save
#>

# Common: Unknown commands
group $_f
    printr,f_1,f_2,f_3,f_4
end
# Common: Inventory access
group $_i
    if !0,!1
        inv,list
    else
        goto,$_f
    end
end
# Common: Points access
group $_p
    if !0,!1
        points,list
    else
        goto,$_f
    end
end
# Common: Game over
group $_go
    if !0
        printc,%n,@BRED,go_0,@WHT,%n%n
        points,list
        printc,%n,@BRED,@UE
        printr,go_1,go_2,go_3,go_4
        printc,%n,@UD,@WHT
        quit
    else
        goto,$_f
    end
end
# Interaction: Talk
group $_t
    if !0,!2
        printr,t_1,t_2
    else
        goto,$_f
    end
end
# Interaction: Walk/Run
group $_w
    if !0,!2
        printr,w_1,w_2
    else
        goto,$_f
    end
end
# Interaction: Look/View/See
group $_l
    if !0,!2
        printr,l_1,l_2,l_3,l_4
    else
        goto,$_f
    end
end
# Interaction: Taking objects
group $_o
    if !0,!2
        printr,o_1,o_2,o_3,o_4
    else
        goto,$_f
    end
end
# State: Save game
group $_ss
    if !0,!3
        save
    else
        goto,$_f
    end
end
# State: Load game
group $_sl
    if !0,!3
        load
    else
        goto,$_f
    end
end

#------------------------------------------------------------------------------
# Actions
#------------------------------------------------------------------------------

# Actions: Common/State
action
    fallback|goto,$_f
    inventory,check inventory,get inventory,inv,check inv,get inv|goto,$_i
    bag,check bag,get bag|goto,$_i
    score,check score,view score|goto,$_p
    points,check points,view points|goto,$_p
    save|goto,$_ss
    load|goto,$_sl
    quit|quit
end

# Actions: Interactions
action
    talk,converse,chat,speak|goto,$_t
    talk to,talk with,converse to,converse with,chat to,chat with,speak to,speak with|goto,$_t
    walk,run|goto,$_w
    pick,take,get,snatch,grasp,pull,reach|goto,$_o
    look,look around,look surroundings,look at,look place|goto,$_l
    see,see around,see surroundings,see place|goto,$_l
    view,view around,view surroundings,view place|goto,$_l
    check,check around,check surroundings,check place|goto,$_l
end

#< @FILE: 2_common.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>, June 2021
#>

#------------------------------------------------------------------------------
# Command groups [Custom]
#------------------------------------------------------------------------------

group _aff
    goto,$_f
end

group _neg
    goto,$_f
end

#------------------------------------------------------------------------------
# Actions [Custom]
#------------------------------------------------------------------------------

# Actions: Affirmative/Negative
action
    yes,y,sure,certainly,of course,no problem,yeah,yez|goto,_aff
    no,n,no way,nope,nawp,nah,not in a million years,never|goto,_neg
end

#< @FILE: s00_intro.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>, June 2021
#>

# Scene: Initial
scene initial
    group $
        scene,s00_prompt
    end
end

# Scene: Prompt on start
scene s00_prompt
    # Messages
    string
        tAcubes|╔═╗╔═╗╔═╗╔═╗╔═╗%n╚═╝╚═╝╚═╝╚═╝╚═╝
        tA1|Please answer the question with either YES or NO.%n
        tA2|Welcome to Pacific Liberty! Would you like some instructions?%n
    end
    # Show introduction question on entry
    group $
        set,0,true
        printc,tAcubes,%n,tA2
    end
    # Re-ask the question on invalid keywords
    group $_f
        printc,tA1,tA2
    end
    # YES
    group _aff
        scene,s00_introduction
    end
    # NO
    group _neg
        set,0,false
        scene,s01_premarch_exposition
    end
end

# Scene: Introduction
scene s00_introduction
    # Introduction message (see lt_instructions for a clean copy of this text)
    string
          tS|║  ---  ---  ---  ---  ---  ---  ---  ----  ---  ---  ---  ---  ---  ---  ---  ║%n
          tH|╔═Introduction═════════════════════════════════════════════════════════════════╗%n
         tI0|║ Welcome to Pacific Liberty, where you'll play the role of a young man who    ║%n
         tI1|║ surprisingly went back in time when he entered their grandparents' old house.║%n
         tI2|║ Flabbergasted with what has befallen his fate, he began exploring an area    ║%n
         tI3|║ looming with people that are wearing unfamiliar clothes, a relic of the past.║%n
        # tS
         tI4|║ Unaware with what he needs in order to survive, he needs your help.          ║%n
         tI5|║ He'll be your eyes and hands, and direct him with words as if you're talking ║%n
         tI6|║ and instructing someone. Be warned that he doesn't understand mispelled words║%n
         tI7|║ or slang. Write in a variety of English that isn't broken. For instance, if  ║%n
         tI8|║ you want him to pack up or get his bag, just type `pack up` or `get bag`.    ║%n
        # tS
         tI9|║ Walking, running, and speaking to others is relatively simple.               ║%n
        tI10|║ Just type "WALK NORTH" if you'd want him to walk north, "RUN AWAY" if you    ║%n
        tI11|║ want him to run away, and if you'd like to speak with someone, like a person ║%n
        tI12|║ who is referred to as "general", just type "SPEAK GENERAL" or "TALK GENERAL".║%n
        tI13|║ Even typing only "TALK" will work in some cases, but not always!             ║%n
        # tS
        tI14|║ The following commands might also prove useful in your journey:              ║%n
        tI15|║ "SAVE" or "LOAD" after which you need to type the the name of the saved game.║%n
        tI16|║ "POINTS" if you'd like to keep track of your progress or score.              ║%n
        tI17|║ "INVENTORY" or "INV" if you'd like to check the items in your inventory.     ║%n
        # tS
        tI18|║                                 *GOOD LUCK!*                                 ║%n
        tI19|║                          Type ANYTHING to CONTINUE.                          ║%n
          tE|╚══════════════════════════════════════════════════════════════════════════════╝%n
    end
    # Show readme on entry
    group $
        # Set color to blue
        printc,@CLS,@BLUB
        # Print the entire readme
        printc,tH,tI0,tI1,tI2,tI3,tS,tI4,tI5,tI6,tI7,tI8,tS,tI9,tI10,tI11,tI12,tI13,tS,tI14,tI15,tI16,tI17,tS,tI18,tI19,tE
        # Reset color
        print,@BLKB
    end
    # Fallback: automatically start the game on any command
    group $_f
        set,0,false
        print,@CLS
        scene,s01_premarch_exposition
    end
end

#< @FILE: s01_main.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>, June 2021
     Rachel Lauren Manlapig <rcmanlapig@student.apc.edu.ph>, May 2021
     Cecille Marie Milan <clmilan@student.apc.edu.ph>, May 2021
     Timothy Jay Sayson <tvsayson@student.apc.edu.ph>, May 2021
     Georgette Tulod <gntulod@student.apc.edu.ph>, May 2021
#>

# Before Death March: Part 01 (start until rock)
scene s01_premarch_exposition
    # Strings
    string
        # Messages
        01_pme_0|A young man discovered an entryway to the past in their ancestor's old house.%nIt's as if he has entered into an entirely new world, back in the 1940s, with %npeople looming in the background and the streets bustling with life. There was %na crowd forming around the capitol building. %n%nSgt. Miller, a man of the American forces, is holding a clipboard bearing the %nnames of the Filipino troops who will fight alongside the Americans to stop the %nJapanese army. %n%n"Pack-up, lads!" said the Sgt.
        01_pme_1|"Make a move on, kid! Unless you want to die at the hands of your foolishness."
        01_pme_2|"Majority of the soldiers here will be evacuated by boat to Bataan %nPeninsula to stop those sons of a gun from invading."
        01_pme_3|You look up the sky and saw there were aircrafts flying fast in the %nclear and humid sky of Pampanga. Many people were shouting how annoying the %nUS Navy is for showing off their flying formation. However, one look at it and %nyou will know which country it truly belonged to. %n%n"It's the Japs! Run for shelter! Bombs!"
        01_pme_4|You saw a huge rock coming your way, should you jump over?
        # Death sequences
        01_pme_d1|You did not jump which led to you stumbling over. As you lay down, you can see %nthe bombs dropping from the sky by the Japanese.
    end
    # Overrides
    group $
        print,01_pme_0
    end
    group $_f
        print,01_pme_1
    end
    group $_l
        if !10,!11,!12,!13
            print,01_pme_0
        elsif 10,!11,!12
            print,01_pme_2
        elsif 10,11,!12
            print,01_pme_3
        elsif 10,11,12
            print,01_pme_4
        else
            goto,$_f
        end
    end
    # YES
    group _aff
        goto,event_4a
    end
    # NO
    group _neg
        goto,event_4b
    end
    # Actions
    action
        pack,get,bag,pack up,take bag,pack bag,take up,get up,move bag, move up|goto,event_1
        head to boat,go to boat,goto boat,head boat,walk boat,to boat,go boat,boat,run boat,run to boat|goto,event_2
        run,runaway,run away,run far,run faraway,run north,run south,run east,run west|goto,event_3
    end
    # 1: Packing up of bags
    group event_1
        if !10
            print,01_pme_2
            set,10,true
        else
            goto,$_f
        end
    end
    # 2: Running away from the Japanese
    group event_2
        if 10,!11
            print,01_pme_3
            set,11,true
        else
            goto,$_f
        end
    end
    # 3: Jump over a rock [P]
    group event_3
        if 10,11,!12
            print,01_pme_4
            set,12,true
        else
            goto,$_f
        end
    end
    # 4a: Jump over a rock (YES)
    group event_4a
        if 10,11,12,!13
            set,13,true
            scene,s01_premarch_ticket
        else
            goto,$_f
        end
    end
    # 4b: Jump over a rock (NO) [D]
    group event_4b
        if 10,11,12,!13
            print,01_pme_d1
            goto,$_go
            quit
        else
            goto,$_f
        end
    end
end

# Before Death March: Part 02 (ticket until headquarters entry)
scene s01_premarch_ticket
    # Strings
    string
        # Messages
        02_pmt_0|You've found 3 potential shelters: %nunder a tree, inside a broken house, and a trench. %n%nWhich will you choose to hide in?
        02_pmt_1|You have lived to see another day. %nYou saw the general in the trench and approached him. 
        02_pmt_2|"The American and Philippine forces have started to surrender to the Japanese." %nOh, how bad news indeed.
        02_pmt_3|"They have given out surrender tickets to our soldiers. Approach them in their %nheadquarters while waving a white flag and your guns pointed behind you." %nThe general looked doubtful about it though.
        02_pmt_4|"Well, if you'd ask me, this ticket system is sketchy. %nBut we'll never know. Best not lose hope in war, kid. Will you go? %nI can accompany you until we reach their camp."
        02_pmt_6|The general accompanies you to the Japanese headquarters. The flag of the rising %nsun is all over the place.
        02_pmt_7| Upon arrival, the Japanese man in the line sees the %nticket and takes you to a secluded part of the compound. 
        # Out-of-script additions
        02_pmt_z1|You are currently in a trench along with other soldiers. The general is beside %nyou, observing the background. There's nothing to be seen on %nthe ground aside from dirt.
        02_pmt_z2|I'm afraid I can't say no to the general. There doesn't seem to be any other choice.
        02_pmt_z3|You've taken the ticket from the general's hands.
        02_pmt_z4|You've already taken the ticket from the general. Don't ask for more.
        02_pmt_z5|There's no ticket to be taken. The general says it might have fallen off somewhere. Oops.
        02_pmt_z6| Upon arrival, the Japanese man asks for the ticket. %nYou don't have any and the general doesn't have an extra ticket lying around. %nThe guards were called and you were taken to the execution grounds.
        02_pmt_z7|You can't go there.
        02_pmt_z8|We all know what happens there, don't we?
        # Death sequences
        02_pmt_d1|Your hiding spot was unsafe. It got bombed and you died!
    end
    # Overrides
    group $
        print,02_pmt_0
    end
    group $_l
        print,02_pmt_z1
    end
    group $_t
        goto,event_6a
    end
    group _aff
        goto,event_7a
    end
    group _neg
        goto,event_7b
    end
    # Actions
    action
        under a tree,under tree,tree,tree under,inside the house,inside house,inside,house,the house|goto,event_5a
        in the trench,trench,walk to trench,walk trench,in trench,the trench,to trench,run trench,run to trench,walk to the trench,run to the trench,run the trench,walk the trench|goto,event_5b
        talk general,talk to general,converse general,converse with general,chat to general,chat with general,chat general,speak to general,speak with general,speak general,interact with general,interact to general|goto,event_6a
        ticket,take ticket,pick ticket,get ticket,snatch ticket,grasp ticket,pull ticket,reach ticket|goto,event_6b
        walk camp,walk to camp,run camp,run to camp,go camp, go to camp|goto,event_7c
    end
    item
        ticket|A ticket written in broken English with a lot of Japanese characters. It says, %n"Surrender Japanese Territory".
    end
    # 5a: Choose hiding spot (unsafe) [D]
    group event_5a
        print,02_pmt_d1
        goto,$_go
    end
    # 5b: Choose hiding spot (safe)
    group event_5b
        if !14
            print,02_pmt_1
            set,14,true
        else
            goto,$_f
        end
    end
    # 6a: Conversation with General
    group event_6a
        # CO: Bad news
        if 14,!15
            print,02_pmt_2
            set,15,true
        # CO: Surrender tickets
        elsif 14,15,!16
            print,02_pmt_3
            set,16,true
        # CO: Sketchy system [P]
        elsif 14,15,16,!17
            print,02_pmt_4
            # We keep switch no. 17 as-is because this is the last message
            set,18,true
        else
            goto,$_f
        end
    end
    # 6b: Take ticket from the General
    group event_6b
        if 16,!18
            if_inv !ticket
                inv,add,ticket
                print,02_pmt_z3
            else
                print,02_pmt_z4
            end
        elsif 18
            if_inv ticket
                print,02_pmt_z4
            else
                print,02_pmt_z5
            end
        else
            goto,$_o
        end
    end
    # 7a: Go to Japanese HQ (YES)
    group event_7a
        if 18
            if_inv ticket
                printc,02_pmt_6,02_pmt_7,%n
                inv,rm,ticket
                scene,s01_premarch_hq
            else
                printc,02_pmt_6,02_pmt_z6,%n%n,@BRED,02_pmt_z8,@WHT,%n
                goto,$_go
            end
        else
            goto,$_f
        end
    end
    # 7b: Go to Japanese HQ (NO)
    group event_7b
        if 18
            print,02_pmt_z2
        else
            goto,$_f
        end
    end
    # 7c: Go to Japanese HQ (YES-through walk)
    group event_7c
        if 18
            goto,event_7a
        else
            print,02_pmt_z7
        end
    end
end

# Before Death March: Part 03 (ticket until headquarters entry)
scene s01_premarch_hq

end

