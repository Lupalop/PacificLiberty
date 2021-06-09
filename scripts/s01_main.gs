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
