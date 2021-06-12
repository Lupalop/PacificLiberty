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
    // 25: Stayted despite Antonio's death
    group event_25
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
            set,105,true
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
        scene,s04_donnell_arrival
    end
end
