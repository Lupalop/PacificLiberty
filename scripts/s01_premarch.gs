#< @FILE: s01_premarch.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
     Rachel Lauren Manlapig <rcmanlapig@student.apc.edu.ph>
     Cecille Marie Milan <clmilan@student.apc.edu.ph>
     Timothy Jay Sayson <tvsayson@student.apc.edu.ph>
     Georgette Tulod <gntulod@student.apc.edu.ph>
#>

# Before Death March: Part 01 (start until rock)
scene s01_premarch_exposition
    # Strings
    string
        # Death sequences
        01_pme_d1|You did not jump which led to you stumbling over. As you lay down, you can see %nthe bombs dropping from the sky by the Japanese.
        # Look
        01_pme_l0|A young man discovered an entryway to the past in their ancestor's old house.%nIt's as if he has entered into an entirely new world, back in the 1940s, with %npeople looming in the background and the streets bustling with life. There was %na crowd forming around the capitol building. %n%nSgt. Miller, a man of the American forces, is holding a clipboard bearing the %nnames of the Filipino troops who will fight alongside the Americans to stop the %nJapanese army.
        01_pme_l1|A lot of soldiers are boarding the ship to Bataan, while %nSgt. Miller is still examining the clipboard with the list of names. %n%nPerhaps you should board the ship too.
        01_pme_l2|You look up the sky and saw there were aircrafts flying fast in the %nclear and humid sky of Pampanga. Many people were shouting how annoying the %nUS Navy is for showing off their flying formation. However, one look at it and %nyou will know which country it truly belonged to. %n%n"It's the Japs! Run for shelter! Bombs!"
        01_pme_l3|You saw a huge rock coming your way, should you jump over?
        # Talk
        01_pme_t0| said Sgt. Miller.
        01_pme_t1|"Make a move on, kid! Unless you want to die at the hands of your foolishness."
        01_pme_t2|"Pack-up, lads!"
        01_pme_t3|"Majority of the soldiers here will be evacuated by ship to Bataan %nPeninsula to stop those sons of a gun from invading."
    end
    # LGO: Entry
    group $
        set,5,true
        print,01_pme_l0
    end
    # LGO: Fallback
    group $_f
        print,01_pme_t1
    end
    # LGO: Talk
    group $$_t
        if !10,!11,!12
            printc,01_pme_t2,01_pme_t0,1n
        elsif 10,!11,!12
            printc,01_pme_t3,01_pme_t0,1n
        else
            goto,~$$_t
        end
    end
    # LGO: Look
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
    # 1: Packing up of bags
    group event_1
        if !10
            print,01_pme_t3
            set,10,true
        else
            goto,$_f
        end
    end
    # 2: Running away from the Japanese
    group event_2
        if 10,!11
            print,01_pme_l2
            set,11,true
            set,5,false
        else
            goto,$_f
        end
    end
    # 3: Jump over a rock [P]
    group event_3
        if 10,11,!12
            print,01_pme_l3
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
    group $$_aff
        goto,event_4a
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
    group $$_neg
        goto,event_4b
    end
    # Actions
    action
        pack,get,pack up,take up,get up,move up|goto,event_1
        board ship,board to ship,board the ship,enter ship,enter the ship,head to ship,go to ship,goto ship,head ship,walk ship,to ship,go ship,ship,run ship,run to ship|goto,event_2
        run,runaway,run away,run far,run faraway,run north,run south,run east,run west|goto,event_3
        talk to miller,talk miller,converse miller,converse with miller,chat miller,chat with miller,speak to miller,speak with miller|goto,$_t
    end
end

# Before Death March: Part 02 (ticket until headquarters entry)
scene s01_premarch_ticket
    # Strings
    string
        # Death sequences
        02_pmt_d0|Your hiding spot was unsafe. It got bombed and you died!
        02_pmt_d1| Upon arrival, the Japanese man%nasks for the ticket. You don't have any and the general doesn't have an extra%nticket lying around. Their soldiers were called and you were taken inside%ntheir headquarters, towards the west wing.
        02_pmt_d2|We all know what happens there, don't we?
        # Look
        02_pmt_l0|You've found 3 potential shelters: %nunder a tree, inside a broken house, and a trench. %n%nWhich will you choose to hide in?
        02_pmt_l1|You are currently in a trench along with other soldiers. The general is beside %nyou, observing the background. There's nothing to be seen on %nthe ground aside from dirt.
        # Talk
        02_pmt_t0|"The American and Philippine forces have started to surrender to the Japanese."%nThe general said.%n%n"Oh, how bad news indeed." You replied back.
        02_pmt_t1|"They have given out surrender tickets to our soldiers. Approach them in their %nheadquarters while waving a white flag and your guns pointed behind you." %nThe general looked doubtful about it though.
        02_pmt_t2|"Well, if you'd ask me, this ticket system is sketchy. But we'll never know.%nBest not lose hope in war, kid. Will you go? I can accompany you%nuntil we reach their camp." The general said.
        02_pmt_t3|The general accompanies you to the outskirts of the Japanese headquarters.%n%nThe flag of the rising sun is all over the place.
        02_pmt_t4| Upon arrival, the Japanese man%nin the line sees the ticket and guides you to their headquarters.
        02_pmt_t5|I'm afraid I can't refuse the general. There doesn't seem to be any other choice. Insubordination is a thing, you know.
        # Take
        02_pmt_o0|You've taken the ticket from the general's hands.
        02_pmt_o1|You've already taken the ticket from the general. Don't ask for more.
        02_pmt_o2|"There's no ticket to be taken."%nThe general said it might have fallen off somewhere. Oops.
        # Interactions
        02_pmt_a0|You have lived to see another day. %nYou saw the general in the trench and approached him. 
    end
    # Items
    item
        white flag|The first of two items that one needs before surrendering.
        ticket|The second of two items that one needs before surrendering.
    end
    # LGO: Entry
    group $
        set,5,true
        print,02_pmt_l0
    end
    # LGO: Look
    group $$_l
        if !14
            print,02_pmt_l0
        else
            print,02_pmt_l1
        end
    end
    # LGO: Talk
    group $$_t
        goto,event_6a
    end
    # LGO: Affirmative
    group $$_aff
        goto,event_7a
    end
    # LGO: Negative
    group $$_neg
        goto,event_7b
    end
    # 5a: Choose hiding spot (unsafe) [D]
    group event_5a
        print,02_pmt_d0
        goto,$_go
    end
    # 5b: Choose hiding spot (safe)
    group event_5b
        if !14
            print,02_pmt_a0
            set,14,true
        else
            goto,$_f
        end
    end
    # 6a: Conversation with General
    group event_6a
        # CO: Bad news
        if 14,!15
            print,02_pmt_t0
            set,15,true
        # CO: Surrender tickets
        elsif 14,15,!16
            printc,02_pmt_t1,2n
            inv,add,white flag
            inv,list
            goto,tip_01
            set,16,true
        # CO: Sketchy system [P]
        elsif 14,15,16,!17
            print,02_pmt_t2
            # We keep switch no. 17 as-is because this is the last message
            set,18,true
        else
            goto,~$$_t
        end
    end
    # 6b: Take ticket from the General
    group event_6b
        if 16,!18
            if_inv !ticket
                inv,add,ticket
                print,02_pmt_o0
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
    # 7a: Go to Japanese HQ (YES) [D]
    group event_7a
        if 18
            if_inv ticket
                printc,02_pmt_t3,02_pmt_t4,2n
                inv,rm,ticket
                inv,rm,white flag
                scene,s01_premarch_hq
            else
                printc,02_pmt_t3,02_pmt_d1,2n,@HRED,02_pmt_d2,@_,1n
                goto,$_go
            end
        else
            goto,$_f
        end
    end
    # 7b: Go to Japanese HQ (NO)
    group event_7b
        if 18
            print,02_pmt_t5
        else
            goto,$_f
        end
    end
    # 7c: Go to Japanese HQ (YES-through walk)
    group event_7c
        if 18
            goto,event_7a
        else
            goto,$_wd
        end
    end
    # Actions
    action
        under a tree,under tree,tree,tree under,inside the house,inside house,inside,house,the house|goto,event_5a
        in the trench,trench,walk to trench,walk trench,in trench,the trench,to trench,run trench,run to trench,walk to the trench,run to the trench,run the trench,walk the trench|goto,event_5b
        talk general,talk to general,converse general,converse with general,chat to general,chat with general,chat general,speak to general,speak with general,speak general,interact with general,interact to general|goto,event_6a
        ticket,take ticket,pick ticket,get ticket,snatch ticket,grasp ticket,pull ticket,reach ticket|goto,event_6b
        walk camp,walk to camp,run camp,run to camp,go camp, go to camp|goto,event_7c
    end
end

# Before Death March: Part 03 (ticket until headquarters entry)
scene s01_premarch_hq
    # Strings
    string
        # Death sequences
        03_pmh_d0|You tried to stand up but it was too late.
        03_pmh_d1|He waited no more and shot you dead.
        # Look
        03_pmh_l0|This is the makeshift Japanese headquarters. You see a lot of chairs with ropes %nand began to tremble. You've never seen anything like this before and is %nshaken with how your grandfather was able to survive this kind of experience.
        03_pmh_l1|The Japanese man stares at you impatiently and is at the verge of pushing you %ntowards the holding area. You might want to consider walking now.
        03_pmh_l2|The holding area is located north, relative to where you're standing, while %nthere are two other signs: the east wing which leads to the Infirmary, and the %nwest wing whose floor seems to be filled with odd stains.
        03_pmh_l3|You're currently inside a prison cell.
        # Talk
        03_pmh_t0|"Where do you think you're going?" The Japanese soldier yelled.
        03_pmh_t1|"We've a newcomer," one of the American soldiers said.
        03_pmh_t2|"I'm afraid there's nothing we can do for now, aside from to sleep or wait for%nthe thing they call food," muttered Stanley, one of the soldiers.
        03_pmh_t3|"Wala na tayong magagawa pa, maliban sa matulog [sleep] o hintayin ang tinatawag%nnilang pagkain [food] dito," muttered José, one of the soldiers.
        03_pmh_t4|"You'd be crazy to think that we'd be able to escape this hellhole 'cause it's%nbuilt to last!" muttered Stanley, one of the soldiers.
        03_pmh_t5|"Try shouting or swearing, it calms the nerves," said David, one of the soldiers.
        03_pmh_t6|The Japanese soldiers are ignoring your pleas of safety and help. Many footsteps%ncan be heard from the hallway, and you try your hardest to look who's come to%nyour rescue or imprisonment.
        03_pmh_t7|A Japanese soldier stepped out of the shadows with a rifle in his hand.%n%n"The tickets were a ruse to further tip the balance of survival and victory on%nour side," said the Japanese soldier.
        # Walk
        03_pmh_w0|You heard unintelligible noises from the Japanese soldier behind you.%nHe seems to be speaking in a language that you cannot decipher.
        03_pmh_w1|You face him and the Japanese soldier readily drags you towards the west wing%nand throws you into one of the cells.
        03_pmh_w2|You continued walking towards the holding area until you heard someone speak.
        03_pmh_w3| Other fellow American and Filipino%nsoldiers are also imprisoned and sharing the same cell as yours.
        # Interactions
        03_pmh_a0|You sat near one of the four corners of the cell, confused and contemplating as%nto why these things are happening to you... A few minutes later and for some%nreason, you were fast asleep.
    end
    # LGO: Entry
    group $
        set,5,true
        print,03_pmh_l0
    end
    # LGO: Fallback
    group $_f
        # X01: Entrance
        if !19
            print,03_pmh_l1
        else
            goto,~$_f
        end
    end
    # LGO: Look
    group $$_l
        # X01: Entrance
        if !19
            printc,03_pmh_l0,2n,03_pmh_l2,1n
        # X02: Prison Cell
        elsif 19,!20
            printc,03_pmh_l3,03_pmh_w3,1n
        else
            goto,~$$_l
        end
    end
    # LGO: Talk
    group $$_t
        # X01: Entrance
        if !19
            print,03_pmh_l1
        # X02: Prison Cell (soldier talk)
        elsif 19,!20
            printr,03_pmh_t2,03_pmh_t3,03_pmh_t4,03_pmh_t5
        else
            goto,~$$_t
        end
    end
    # LGO: Direction (Generic)
    group $$_wd
        if 19,!20
            print,03_pmh_t0
        else
            goto,~$$_wd
        end
    end
    # LGO: Direction (North)
    group $$_wd_n
        if !19
            set,19,true
            printc,03_pmh_w2,2n,03_pmh_w0,2n,03_pmh_w1,03_pmh_w3,2n,03_pmh_t1,1n
        else
            goto,$$_wd
        end
    end
    # LGO: Direction (East) [D]
    group $$_wd_e
        if !19
            printc,03_pmh_w0,2n,03_pmh_w1,03_pmh_d0,2n
            printc,@HRED,03_pmh_d1,@_,1n
            goto,$_go
        else
            goto,$$_wd
        end
    end
    # LGO: Direction (West) [D]
    group $$_wd_w
        if !19
            goto,$$_wd_e
        else
            goto,$$_wd
        end
    end
    # 8: Sleep
    group event_8
        if 19,!20
            print,03_pmh_a0
            set,20,true
            scene,s01_premarch_final
        else
            goto,$_f
        end
    end
    # 9: Shout/Plead for Help [D]
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
    # Actions
    action
        talk soldier,talk to soldier,talk with soldier|goto,$_t
        converse soldier,converse to soldier,converse with soldier|goto,$_t
        chat soldier,chat to soldier,chat with soldier|goto,$_t
        speak soldier,speak to soldier,speak with soldier|goto,$_t
        sleep,tulog,go to sleep,lie down,sleep now,sleep down,sleep floor,sleep on floor,sleep on the floor,just sleep|goto,event_8
        shout,shout loud,shout help,plead for help,plead,send help,get help|goto,event_9
    end
end

# Before Death March: Part 04 (final)
scene s01_premarch_final
    # Strings
    string
        # Death sequences
        04_pmf_d0|You're not interested? Okay...
        # Look
        04_pmf_l0|Today is the 9th of April 1942, the time when the Americans surrendered to the%nforces of the Japanese. The troops captive consists of 66,000 Filipinos and%n12,000 Americans. The country is now subjugated by the Japanese and compel us to%nwalk 65 miles from Mariveles, Bataan to Camp O'Donnell.%n%nAre you ready to march to death?
        04_pmf_l1|Due to the huge number of captives, it was divided into groups consisting of%n100 to 1000 troops.
        04_pmf_l2| You noticed that there's a man trying to converse with you.
        # Talk
        04_pmf_t0|"Don't you think the Japanese are being too harsh on us? I mean, we're also%nsoldiers like them," the man complained.
        04_pmf_t1|"No, best we keep our mouths shut," you answered.
        04_pmf_t2|The man was taken aback. You guys stopped talking.
        04_pmf_t3|The man introduced himself as Antonio. You quickly became close friends with him.
        04_pmf_t4|Lieutenant General Homma Masaharu fired a gun so the troops will stop talking and start walking. "Rokudenashi, isoide!" the General shouted at the troops.
    end
    # LGO: Entry
    group $
        set,5,true
        print,04_pmf_l0
    end
    # LGO: Talk
    group $$_t
        # X02: Talk with Antonio
        if 22,!24
            print,04_pmf_t0
            set,23,true
        elsif 22,23,24
            print,04_pmf_t4
        else
            goto,~$$_t
        end
    end
    # LGO: Walk
    group $$_wd_e
        if 22,23,24
            goto,event_12
        else
            goto,~$$_wd
        end
    end
    # LGO: Look
    group $$_l
        # X01: Initial walk prompt
        if !22
            print,04_pmf_l0
        # X02: Talk with Antonio
        elsif 22,!24
            printc,04_pmf_l1,04_pmf_l2,1n
        elsif 22,24
            print,04_pmf_l1
        else
            goto,~$$_l
        end
    end
    # LGO: Affirmative
    group $$_aff
        # X01: Initial walk prompt
        if !22
            goto,event_10a
        # X02: Talk with Antonio
        elsif 22,23,!24
            goto,event_11a
        else
            goto,$_f
        end
    end
    # LGO: Negative
    group $$_neg
        # X01: Initial walk prompt
        if !22
            goto,event_10b
        # X02: Talk with Antonio
        elsif 22,23,!24
            goto,event_11b
        else
            goto,$_f
        end
    end
    # 10a: Yes to the march
    group event_10a
        printc,04_pmf_l1,04_pmf_l2,1n
        set,22,true
    end
    # 10b: No to the march [D]
    group event_10b
        printc,@HRED,04_pmf_d0,@_,1n
        goto,$_go
    end
    # 11a: "Yes to friends"
    group event_11a
        set,24,true
        # SW: 25 - friends with Antonio switch
        set,25,true
        print,04_pmf_t3
    end
    # 11b: "No to friends"
    group event_11b
        set,24,true
        printc,04_pmf_t1,2n,04_pmf_t2,1n
    end
    # 12: Switch to Cabcaben
    group event_12
        scene,s02_cabcaben_arrival
    end
    # Actions
    action
        talk antonio,talk to antonio,talk with antonio|goto,$_t
        converse antonio,converse to antonio,converse with antonio|goto,$_t
        chat antonio,chat to antonio,chat with antonio|goto,$_t
        speak antonio,speak to antonio,speak with antonio|goto,$_t
    end
end
