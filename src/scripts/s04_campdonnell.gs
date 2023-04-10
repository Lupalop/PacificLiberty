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
    // @DEF duplicated functions from s02_cabcaben_arrival
    // 19a: Fighting back to the Japanese [D]
    function event_19a
        print,05_cba_d5
        call,$_go
    end
    // 19b: Throwing a rock at the Japanese [D]
    function event_19b
        if i:rock
            printc,05_cba_d6,2n,05_cba_d5,1n
            call,$_go
        else
            call,$_ms
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
    function $
        set,5,false
        print,10_cda_l0
    end
    // LGO: Fallback
    function $_f
        // SWE: 199 - death by food stealing
        if interactionsDisabled && 199
            call,event_29
        else
            super
        end
    end
    // LGO: Talk
    function $$_t
        if !150 || !151
            printc,t_10,10_cda_t1,1n
        elsif !152
            print,t_10
        else
            super
        end
    end
    // LGO: Look
    function $$_l
        if !150
            print,10_cda_l0
        elsif 150 && !151
            print,10_cda_l1
        elsif 151 && !152
            print,10_cda_l2
        else
            super
        end
    end
    // LGO: Walk
    function $$_w
        call,event_29
    end
    // LGO: Objects
    function $$_o
        // E: Taking objects isn't deadly anymore
        if !150
            call,event_29
        else
            super
        end
    end
    // LGO: Direction (Generic)
    function $$_wd
        call,event_29
    end
    // LGO: Affirmative
    function $$_aff
        // E: Took the food [D]
        if 150 && !151
            call,event_30
        // E: Accepted room assignments
        elsif 151 && !152
            call,event_32a
        else
            call,$_f
        end
    end
    // LGO: Negative
    function $$_neg
        // E: Refused to stand under the sun
        if !150
            call,event_29
        // E: Hunger can wait
        elsif 150 && !151
            call,event_31
        // E: Defied room orders
        elsif 151 && !152
            call,event_32b
        else
            call,$_f
        end
    end
    // 28: Stayed here
    function event_28
        // E: Food is available
        if !150
            print,10_cda_l1
            // SW: 150 - Begin food prompt
            set,150,true
        // E: Hunger can wait
        elsif 150 && !151
            call,event_31
        // E: Defied room orders
        elsif 151 && !152
            call,event_32b
        // E: Inaccessible
        else
            call,$_msp
        end
    end
    // 29: Defied Japanese orders [D]
    function event_29
        printr,10_cda_d1,10_cda_d2
        call,$_go
    end
    // 30: Took the food [D]
    function event_30
        if 150 && !151
            print,10_cda_d0
            // SW: 199 - Death by food stealing
            set,199,true
            // Disable all interactions
            set,interactionsDisabled,true
        else
            call,$_msp
        end
    end
    // 31: Endure hunger
    function event_31
        if 150 && !151
            printc,10_cda_a0,2n,10_cda_l2,1n
            // SW: 151 - Enter the room prompt
            set,151,true
            points,add,5
        else
            call,$_msp
        end
    end
    // 32a: Accepted room and task assignments
    function event_32a
        // SW: 152 - Moved to room assignment
        set,152,true
        points,add,5
        scene,s04_campdonnell_room
    end
    // 32b: Defied room and task orders [D]
    function event_32b
        print,10_cda_d1
        call,$_go
    end
    // Actions
    action
        stay,stay here,stay in place,stand still,standing still,stand here,stand,remain in place,remain here standing,remain here,remain,do not go away,don't go away,don't go in,do not go in|call,event_28
        run away,walk away,go away,travel away,run in fear,run fear,walk in fear,walk fear,go in fear,go fear,travel in fear,travel fear,i am a coward,i'm a coward,coward|call,event_29
        // Food-specific
        food,pick food,take food,get food,snatch food,grasp food,pull food,reach food|call,event_30
        // Walk-related
        the room,room,enter room,enter the room|call,event_32a
        walk room,walk to room|call,event_32a
        run room,run to room|call,event_32a
        go room,go to room|call,event_32a
        travel room,travel to room|call,event_32a
        // Imported actions
        fight,fight back,fight japanese soldier,fight japanese,fight jap soldier,fight jap,kill,kill japanese soldier,kill japanese,kill jap soldier,kill japs|call,event_19a
        throw rock,throw rock at japanese soldier,throw rock at jap soldier,throw rock at soldier,trhwo rock at japs|call,event_19b
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
    function $
        set,5,false
        print,11_cdr_l0
    end
    // LGO: Fallback
    function $_f
        // SWE: 198 - Death by sleeping
        if interactionsDisabled && 198
            call,event_33b
        else
            super
        end
    end
    // LGO: Talk
    function $$_t
        print,t_10
    end
    // LGO: Look
    function $$_l
        print,11_cdr_l0
    end
    // 33a: Take a rest [D]
    function event_33a
        print,11_cdr_a0
        // SW: 198 - Death by sleeping
        set,198,true
        // Disable all interactions
        set,interactionsDisabled,true
    end
    // 33b: Death by sleeping [D]
    function event_33b
        print,11_cdr_d0
        call,$_go
    end
    // 34: Look for food
    function event_34
        // SW: 153 - Moved to hunting assignment
        set,153,true
        points,add,5
        scene,s04_campdonnell_hunting
    end
    // Actions
    action
        take a rest now,take a rest,rest now,rest,take a nap,nap,nap now,sleep,sleep floor,sleep corner,go sleep,go rest,go nap|call,event_33a
        look for food,look food,food,search for food,search food,scavenge for food,scavenge food,hunt for food,hunt food|call,event_34
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
    function $
        set,5,true
        call,$$_l
    end
    // LGO: Look
    function $$_l
        if !154
            print,12_cdh_l0
        elsif 154 && !155
            printc,12_cdh_l2,2n,12_cdh_l3,1n
        else
            super
        end
    end
    // L: Chicken
    function _l_chicken
        if !i:chicken
            print,12_cdh_l1
        else
            print,12_cdh_l2
        end
    end
    // T: Chicken
    function _t_chicken
        if 154
            print,12_cdh_t1
        else
            print,12_cdh_t0
        end
    end
    // 35a: Kill chicken
    function event_35a
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
    function event_35b
        if !154
            print,12_cdh_d0
            call,$_go
        else
            print,12_cdh_l2
        end
    end
    // 36a: Eat the chicken [D]
    function event_36a
        if 154
            inv,rm,chicken
            print,12_cdh_d1
            call,$_go
        else
            print,12_cdh_a2
        end
    end
    // 36b: Don't eat the chicken
    function event_36b
        if 154
            // SW: 155 - Refused to eat the chicken
            set,155,true
            points,add,5
            scene,s04_campdonnell_camp_returnprompt
        else
            if !i:chicken
                print,12_cdh_a1
            else
                call,$_ms
            end
        end
    end
    // 35b/36b: Dual action
    function event_d_35b_36b
        if !154
            call,event_35b
        else
            call,event_36b
        end
    end
    // Actions
    action
        // Hunting actions
        chicken,look chicken,view chicken,see chicken,check chicken|call,_l_chicken
        talk chicken,talk to chicken,talk with chicken|call,_t_chicken
        converse chicken,converse to chicken,converse with chicken|call,_t_chicken
        chat chicken,chat to chicken,chat with chicken|call,_t_chicken
        speak chicken,speak to chicken,speak with chicken|call,_t_chicken
        kill,kill the chicken,kill chicken,hunt,hunt the chicken,hunt chicken,hunt and kill,hunt and kill the chicken,hunt and kill chicken,hunt kill chicken,hunt for more chicken,hunt for more,hunt more chicken|call,event_35a
        do not kill the chicken,don't kill the chicken,don't kill chicken,allow the chicken to escape,allow chicken to escape,allow chicken escape,chicken escape,escape chicken|call,event_35b
        // Dual meaning actions
        leave,leave the chicken alone,leave chicken alone,leave chicken,leaving it alone,leave it alone,leave it,stay here,stay,do not move,don't move,no move|call,event_d_35b_36b
        // Eat or leave chicken alone actions
        cook the chicken,cook chicken,cook,eat the chicken raw,eat chicken raw,eat it raw,eat the chicken,eat chicken,eating the chicken raw,eating chicken raw,eating chicken|call,event_36a
        do not eat the chicken,do not eat chicken,don't eat the chicken,don't eat chicken,don't eat,don't eat it raw,don't eat it,no eat,no chicken eat,no chicken eat raw|call,event_36b
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
    function $
        set,5,false
        printc,13_rtc_l0,2n,13_rtc_l1,1n
    end
    // LGO: Look
    function $$_l
        print,13_rtc_l1
    end
    // 37: Return to camp
    function event_37
        // SW: 156 - Returned to the camp
        set,156,true
        points,add,5
        scene,s04_campdonnell_camp_helpsoldier
    end
    // 38: Take a nap
    function event_38
        print,13_rtc_d0
        call,$_go
    end
    // Actions
    action
        returning to camp immediately,returning camp immediately,returning camp,return to camp, return camp,return,return now|call,event_37
        walk camp,walk to camp|call,event_37
        run camp,run to camp|call,event_37
        go camp,go to camp|call,event_37
        travel camp,travel to camp|call,event_37
        
        taking a quick nap and rest,taking a quick nap,take a nap,take nap,nap,take quick nap,quick nap,rest,sleep,quick rest,rest now|call,event_38
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
    function $
        set,5,true
        printc,14_chs_l0,2n,14_chs_l1,1n
    end
    // LGO: Fallback
    function $_f
        if interactionsDisabled && 197
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
                call,$_go
            // This shouldn't be reached. Oh well...
            else
                call,$_go
            end
        else
            super
        end
    end
    // LGO: Look
    function $$_l
        print,14_chs_l1
    end
    // LGO: Affirmative
    function $$_aff
        if 190
            call,event_39a
        else
            print,14_chs_l1
        end
    end
    // LGO: Negative
    function $$_neg
        if 190
            call,event_39b
        else
            print,14_chs_l1
        end
    end
    // T: Soldier
    function _t_soldier
        print,14_chs_t0
        // SW: 190 - Talked to soldier David
        if !190
            set,190,true
            points,add,2
        end
    end
    // 39a: Help the soldier [D]
    function event_39a
        print,14_chs_t1
        // SW: 197 - Death by cleaning the fence
        set,197,true
        // Disable all interactions
        set,interactionsDisabled,true
    end
    // 39b: Continue resting
    function event_39b
        // SW: 161 - Continued resting
        set,161,true
        points,add,3
        scene,s04_campdonnell_camp_shooting
    end
    // Actions
    action
        talk soldier,talk to soldier,talk with soldier|call,_t_soldier
        converse soldier,converse to soldier,converse with soldier|call,_t_soldier
        chat soldier,chat to soldier,chat with soldier|call,_t_soldier
        speak soldier,speak to soldier,speak with soldier|call,_t_soldier
        talk troop,talk to troop,talk with troop|call,_t_soldier
        converse troop,converse to troop,converse with troop|call,_t_soldier
        chat troop,chat to troop,chat with troop|call,_t_soldier
        speak troop,speak to troop,speak with troop|call,_t_soldier
        talk david,talk to david,talk with david|call,_t_soldier
        converse david,converse to david,converse with david|call,_t_soldier
        chat david,chat to david,chat with david|call,_t_soldier
        speak david,speak to david,speak with david|call,_t_soldier
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
    function $
        set,5,true
        print,15_ccs_l0
    end
    // LGO: Look
    function $$_l
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
            super
        end
    end
    // LGO: Walk
    function $$_w
        if 162
            print,15_ccs_w0
            // SW: 163 - Went to dinner
            set,163,true
            points,add,5
            scene,s04_campdonnell_camp_dinner
        else
            super
        end
    end
    // LGO: Direction (Generic)
    function $$_wd
        if 162
            call,$$_w
        else
            super
        end
    end
    // T: Soldier
    function _t_soldier
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
        talk soldier,talk to soldier,talk with soldier|call,_t_soldier
        converse soldier,converse to soldier,converse with soldier|call,_t_soldier
        chat soldier,chat to soldier,chat with soldier|call,_t_soldier
        speak soldier,speak to soldier,speak with soldier|call,_t_soldier
        talk troop,talk to troop,talk with troop|call,_t_soldier
        converse troop,converse to troop,converse with troop|call,_t_soldier
        chat troop,chat to troop,chat with troop|call,_t_soldier
        speak troop,speak to troop,speak with troop|call,_t_soldier
        dinner,eat dinner,gather for dinner,gather,gather up,gather up for dinner|call,$_w
    end
end

// Camp O'Donnell: Part 07 (Dinner)
scene s04_campdonnell_camp_dinner
    //===============
    // @DEF duplicated functions from 2_egs.gs
    // Interaction: swearing
    function $$_swear
        call,event_41a
    end
    function $_swear
        if !reservedGCGDisabled && !interactionsDisabled
            call,$$_swear
        else
            call,$_f
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
    function $
        set,5,true
        print,16_ccd_l0
    end
    // LGO: Look
    function $$_l
        if !167
            print,16_ccd_l0
        else
            print,16_ccd_l1
        end
    end
    // LGO: Talk
    function $$_t
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
    function $$_aff
        call,event_41a
    end
    // LGO: Negative
    function $$_neg
        call,event_41b
    end
    // 40: Eat food
    function event_40
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
    function event_41a
        if 167 && !168
            printc,16_ccd_d0,2n,16_ccd_d1,1n
            call,$_go
        else
            call,$_f
        end
    end
    // 42: No to swearing
    function event_41b
        if 167 && !168
            print,16_ccd_t4
            // SW: 168 - Declined Stanley's challenge
            set,168,true
            points,add,2
        else
            call,$_f
        end
    end
    // Actions
    action
        eat,eat chicken,eat dinner,eat now,eat food|call,event_40
        // Fallback for absence of easter eggs game script
        accept the challenge,accept challenge|call,event_41a
        good evening sh*t face,good evening sh*t|call,event_41a
        try shouting,shouting,shout,try swearing,swear,swear now,sh*t face,s**t face|call,event_41a
        no to swearing,do not try,don't try,I won't,I would not,I will not|call,event_41b
        talk soldier,talk to soldier,talk with soldier|call,$_t
        converse soldier,converse to soldier,converse with soldier|call,$_t
        chat soldier,chat to soldier,chat with soldier|call,$_t
        speak soldier,speak to soldier,speak with soldier|call,$_t
        talk troop,talk to troop,talk with troop|call,$_t
        converse troop,converse to troop,converse with troop|call,$_t
        chat troop,chat to troop,chat with troop|call,$_t
        speak troop,speak to troop,speak with troop|call,$_t
        talk stanley,talk to stanley,talk with stanley|call,$_t
        converse stanley,converse to stanley,converse with stanley|call,$_t
        chat stanley,chat to stanley,chat with stanley|call,$_t
        speak stanley,speak to stanley,speak with stanley|call,$_t
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
    function $
        print,17_ccl_10
    end
    // LGO: Look
    function $$_l
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
    function event_43
        if 172 && 173 && 174
            print,17_ccl_a0
            points,add,2
            scene,s04_campdonnell_liberation
        else
            call,$_msp
        end
    end
    // 44: Fight to stay awake [D]
    function event_44
        if 172 && 173 && 174
            print,17_ccl_a1
            call,$_go
        else
            call,$_msp
        end
    end
    // Actions
    action
        sleep,sleep now,take a rest,take rest,rest|call,event_43
        fight to stay awake,fight stay awake,stay awake,fight awake,awake|call,event_44
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
    function $
        print,18_fre_f0
        // Disable all interactions
        set,interactionsDisabled,true
    end
    // LGO: Fallback
    function $_f
        call,event_45
    end
    // 45: Narration of the End of War
    function event_45
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
            set,interactionsDisabled,false
            // END THE GAME!
            scene,s05_end
        else
            call,$_f
        end
    end
end
