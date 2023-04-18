/* @FILE: s03_sanfernando.gs
   © Lupalop Games - All Rights Reserved
   This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
   To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-nd/4.0/
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
    function $
        set,5,true
        call,$_l
    end
    // LGO: Look
    function $$_l
        if !100
            printc,06_sfa_l0,06_sfa_l1,1n
        else
            printc,06_sfa_l0,06_sfa_l2,1n
        end
    end
    // T: to Antonio
    function _t_antonio
        if !reservedGCGDisabled && !interactionsDisabled
            // SW: 100 - Walked to Antonio
            if !100
                print,06_sfa_t0
            // SW: 101 - Talk then gunfire
            elsif !101
                print,06_sfa_t1
                points,add,2
                scene,s03_sanfernando_gunfireprompt
            else
                call,$_msp
            end
        else
            call,$_f
        end
    end
    // W: to Antonio
    function _w_antonio
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
        talk antonio,talk to antonio,talk with antonio|call,_t_antonio
        converse antonio,converse to antonio,converse with antonio|call,_t_antonio
        chat antonio,chat to antonio,chat with antonio|call,_t_antonio
        speak antonio,speak to antonio,speak with antonio|call,_t_antonio
        walk antonio,walk to antonio|call,_w_antonio
        run antonio,run to antonio|call,_w_antonio
        go antonio,go to antonio|call,_w_antonio
        travel antonio,travel to antonio|call,_w_antonio
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
    function $
        set,5,false
        call,$_l
    end
    // LGO: Fallback
    function $_f
        print,qs_0
        call,$_l
    end
    // LGO: Look
    function $$_l
        if !102
            print,07_sfg_l0
        elsif !103
            print,07_sfg_l1
        end
    end
    // LGO: Walk
    function $$_w
        call,event_23
    end
    // LGO: Direction (Generic)
    function $$_wd
        call,event_23
    end
    // 22: Stay in place
    function event_22
        // SW: 102 - Stayed with group
        if !102
            printc,07_sfg_a0,2n,07_sfg_l1,1n
            set,102,true
            points,add,5
        // SW: 103 - Stayed despite Antonio's death
        elsif !103
            call,event_25
        else
            call,$_msp
        end
    end
    // 23: Run or walk away [D]
    function event_23
        // SWE: 102 - Death when trying to run away
        if !102
            print,07_sfg_d0
            call,$_go
        else
            call,$_msp
        end
    end
    // 24: Avenge Antonio [D]
    function event_24
        // SWE: 103 - Death when trying to avenge Antonio
        if !103
            print,07_sfg_d1
            call,$_go
        else
            call,$_msp
        end
    end
    // 25: Stayed despite Antonio's death
    function event_25
        points,add,5
        scene,s03_sanfernando_malaria
    end
    // Actions
    action
        stay,stay here,stay in place,stand still,stand here,stand,remain in place,remain here standing,remain here,remain,do not go away,don't go away|call,event_22
        run away,walk away,go away,travel away,run in fear,run fear,walk in fear,walk fear,go in fear,go fear,travel in fear,travel fear,i am a coward,i'm a coward,coward|call,event_23
        approach antonio,approach japanese,approach japs,avenge,avenge antonio,fight back,fight japanese soldier,fight japanese,fight jap soldier,fight jap,kill japanese soldier,kill japanese,kill jap soldier,kill japs|call,event_24
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
    function $
        set,5,false
        if !105
            print,08_sfm_l0
        else
            call,$$_l
        end
    end
    // LGO: Fallback
    function $_f
        // SWE: 105 - Anything other than no is death
        if 105 && !106
            call,event_26a
        // SWE: 106 - Bathroom question prompt
        elsif 106 && !107
            printc,qs_0,1n,08_sfm_t1,1n
        else
            super
        end
    end
    // LGO: Look
    function $$_l
        // SWE: 104 - Hide stop in front message
        if !104
            print,08_sfm_l1
            // SW: 105 - Allow talk with Japanese
            if !105
                set,105,true
                points,add,5
            end
        // SWE: 105 - Malaria question prompt
        elsif 105 && !106
            print,08_sfm_t0
        // SWE: 106 - Bathroom question prompt
        elsif 106 && !107
            print,08_sfm_t1
        else
            super
        end
    end
    // LGO: Talk
    function $$_t
        // SWE: 105 - Malaria question prompt
        if 105 && !106
            print,08_sfm_t0
            if !104
                // SW: 104 - Other messages would mean death
                set,104,true
                points,add,5
            end
        // SWE: 106 - Bathroom question prompt
        elsif 106 && !107
            print,08_sfm_t1
        else
            super
        end
    end
    // LGO: Affirmative
    function $$_aff
        // Y0: Death from stabbing
        if 104 && !106
            call,event_26a
        // Y1: Death in bathroom
        elsif 106 && !107
            call,event_27a
        else
            call,$_f
        end
    end
    // LGO: Negative
    function $$_neg
        // N0: Asked for bathroom
        if 104 && !106
            call,event_26b
        // N1: Pushed back to line
        elsif 106 && !107
            call,event_27b
        else
            call,$_f
        end
    end
    // 26a: Malaria positive [D]
    function event_26a
        print,08_sfm_d0
        call,$_go
    end
    // 26b: Malaria negative
    function event_26b
        print,08_sfm_t1
        // SW: 106 - Show bathroom question prompt
        set,106,true
        points,add,5
    end
    // 27a: YES to bathroom
    function event_27a
        printr,08_sfm_d0,08_sfm_d1,08_sfm_d2
        call,$_go
    end
    // 27b: NO to bathroom
    function event_27b
        // SW: 107 - Passed all death questions
        set,107,true
        points,add,5
        scene,s03_sanfernando_final
    end
    // Actions
    action
        talk japanese,talk to japanese,talk with japanese|call,$_t
        converse japanese,converse to japanese,converse with japanese|call,$_t
        chat japanese,chat to japanese,chat with japanese|call,$_t
        speak japanese,speak to japanese,speak with japanese|call,$_t
        talk japs,talk to japs,talk with japs|call,$_t
        converse japs,converse to japs,converse with japs|call,$_t
        chat japs,chat to japs,chat with japs|call,$_t
        speak japs,speak to japs,speak with japs|call,$_t
        talk soldier,talk to soldier,talk with soldier|call,$_t
        converse soldier,converse to soldier,converse with soldier|call,$_t
        chat soldier,chat to soldier,chat with soldier|call,$_t
        speak soldier,speak to soldier,speak with soldier|call,$_t
        talk japanese soldier,talk to japanese soldier,talk with japanese soldier|call,$_t
        converse japanese soldier,converse to japanese soldier,converse with japanese soldier|call,$_t
        chat japanese soldier,chat to japanese soldier,chat with japanese soldier|call,$_t
        speak japanese soldier,speak to japanese soldier,speak with japanese soldier|call,$_t
        talk jap soldier,talk to jap soldier,talk with jap soldier|call,$_t
        converse jap soldier,converse to jap soldier,converse with jap soldier|call,$_t
        chat jap soldier,chat to jap soldier,chat with jap soldier|call,$_t
        speak jap soldier,speak to jap soldier,speak with jap soldier|call,$_t
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
    function $
        print,09_sff_l0
        set,5,false
    end
    // LGO: Look
    function $$_l
        print,09_sff_l0
    end
    // LGO: Direction (North)
    function $$_wd_n
        print,09_sff_a0
        points,add,5
        scene,s04_donnell_arrival
    end
end
