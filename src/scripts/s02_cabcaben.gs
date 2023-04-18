/* @FILE: s02_cabcaben.gs
   © Lupalop Games - All Rights Reserved
   This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
   To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-nd/4.0/
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
    function $
        print,05_cba_l0
    end
    // LGO: Fallback
    function $_f
        // SWE: 99 - Rock death sequence
        if interactionsDisabled && 99
            call,event_16
        elsif interactionsDisabled && 63
            call,event_18
        else
            super
        end
    end
    // LGO: Talk
    function $$_t
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
        elsif 54 && 56 && !57
            if i:rock
                printc,05_cba_t3,2n,05_cba_t4,1n
            else
                print,05_cba_t4
            end
            set,57,true
            points,add,2
        // SWE: 57 - Question about plan (prompt)
        elsif 57 && !58
            print,05_cba_t4
        // SWE: 63 - Enabled steal keys plan
        elsif 63 && !65
            call,event_20
        else
            super
        end
    end
    // LGO: Look
    function $$_l
        // L0: Shown during soldier talks
        if !51 && !52 && !53
            print,05_cba_l0
        // L1: Shown when player hasn't stood up (on ground)
        elsif 53 && !54
            print,05_cba_l1
        // L2: Shown during conversation with Antonio
        elsif 54 && !58
            print,05_cba_l2
            // SW: 56 - Allow talk to Antonio
            if !56
                set,56,true
                points,add,5
            end
        // L3: Shown after Japanese approach
        elsif 63 && !65
            print,05_cba_l3
        else
            super
        end
    end
    // LGO: Affirmative
    function $$_aff
        if 57 && !58
            call,event_15a
        else
            call,$_f
        end
    end
    // LGO: Negative
    function $$_neg
        if 57 && !58
            call,event_15b
        else
            call,$_f
        end
    end
    // 13: Stand up
    function event_13
        // SW: 54 - Stood up 
        if 53 && !54
            print,05_cba_l2
            set,54,true
            points,add,2
        else
            call,$_f
        end
    end
    // 14: Rock weapon
    function event_14
        // SW: 55 - Rock: can't be picked anymore
        if 54 && !55
            if i:rock
                inv,add,rock
                print,05_cba_o0
                points,add,5
            else
                // Rock was already picked
                print,05_cba_o1
            end
        else
            call,$_f
        end
    end
    // 15a: YES to plan [P]
    function event_15a
        // Not friends scenario [D]
        if !25
            if i:rock
                // SW: 99 - Is rock death sequence enabled?
                set,99,true
                // Disable all interactions
                set,interactionsDisabled,true
                print,05_cba_d0
            else
                // Plan was refused by Antonio
                print,05_cba_t5
                call,$_go
            end
        // Friends, success scenario
        else
            call,event_17
        end
        // SW: 58 - Plan question sequence finished
        set,58,true
    end
    // 15b: NO to plan [P]
    function event_15b
        // Rock without plan [D]
        if i:rock
            // SW: 99 - Is rock death sequence enabled?
            set,99,true
            // Disable all interactions
            set,interactionsDisabled,true
            call,event_16
        // Just without plan
        else
            // Not friends scenario [D]
            if !25
                // Plan was refused by Antonio
                print,05_cba_t5
                call,$_go
            // Friends, success scenario
            else
                call,event_17
            end
        end
        // SW: 58 - Plan question sequence finished
        set,58,true
    end
    // 16: Death by rock [D]
    function event_16
        // SW: 59 - Rock death sequence #1 [Friends]
        if 25 && !59
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
            call,$_go
        else
            call,$_f
        end
    end
    // 17: Stealing the keys suggestion
    function event_17
        // SW: 63 - Steal keys plan
        if !63
            print,05_cba_t6
            // Prevent rock from being picked up at this point
            set,55,true
            set,63,true
            // Disable all interactions (Japanese approach)
            set,interactionsDisabled,true
            points,add,5
        end
    end
    // 18: Japanese soldier approach
    function event_18
        print,05_cba_a1
        // SW: 64 - Can fight back Japanese soldier
        set,64,true
        // Restore all interactions
        set,interactionsDisabled,false
        points,add,5
    end
    // 19a: Fighting back to the Japanese [D]
    function event_19a
        if 64
            print,05_cba_d5
            call,$_go
        end
    end
    // 19b: Throwing a rock at the Japanese [D]
    function event_19b
        if 64
            if i:rock
                printc,05_cba_d6,2n,05_cba_d5,1n
                call,$_go
            else
                call,$_ms
            end
        end
    end
    // 19c: Killing Antonio [D]
    function event_19c
        if 56
            if !25
                printc,05_cba_d2,2n,05_cba_d7,1n
                call,$_go
            else
                print,05_cba_a2
            end
        else
            call,$_ms
        end
    end
    // 19d: Throwing rock at Antonio [D]
    function event_19d
        if 56
            if !25
                printc,05_cba_d8,2n,05_cba_d5,1n
                call,$_go
            else
                print,05_cba_a2
            end
        else
            call,$_ms
        end
    end
    // 20: End of scene
    function event_20
        // SW: 65 - Final plan talk
        set,65,true
        points,add,5
        scene,s03_sanfernando_arrival
    end
    // Actions
    action
        get up,stand up,stand,walk up|call,event_13
        pick rock,take rock,get rock,snatch rock,grasp rock,pull rock,reach rock|call,event_14
        fight back,fight japanese soldier,fight japanese,fight jap soldier,fight jap,kill japanese soldier,kill japanese,kill jap soldier,kill japs|call,event_19a
        throw rock,throw rock at japanese soldier,throw rock at jap soldier,throw rock at soldier,trhwo rock at japs|call,event_19b
        kill antonio,strangle antonio,kick antonio|call,event_19c
        throw rock at antonio,throw rock antonio|call,event_19d
        talk antonio,talk to antonio,talk with antonio|call,$_t
        converse antonio,converse to antonio,converse with antonio|call,$_t
        chat antonio,chat to antonio,chat with antonio|call,$_t
        speak antonio,speak to antonio,speak with antonio|call,$_t
    end
end
