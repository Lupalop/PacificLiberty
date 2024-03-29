/* @FILE: s00_intro.gs
 * © Lupalop Games - All Rights Reserved
 * This work is licensed under the CC BY-NC-ND 4.0 license.
 * To view a copy of this license, visit
 * https://creativecommons.org/licenses/by-nc-nd/4.0/
 * Contributor(s):
 *   Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>
 */

// Scene: Initial
scene initial
    function $
        scene,s00_prompt
    end
end

// Scene: Prompt on start
scene s00_prompt
    // Messages
    string
         tAd0|Pacific Liberty v1.0.0b1 (Beta 1)%n
         tAd1|DISCLAIMER: This is a pre-release version of the game. Bugs are unavoidable.%n%n
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
    function $
        set,reservedGCGDisabled,true
        printc,tAd0,tAd1
        printc,1n,@HBLU,tAh0,tAh1,tAh2,tAh3,tAh4,tAh5,@HRED,tAh6,tAh7,tAh8,tAh9,tAh10,tAh11,@_,tA2
    end
    // Re-ask the question on invalid keywords
    function $_f
        printc,tA1,tA2
    end
    // YES
    function $_aff
        scene,s00_introduction
    end
    // NO
    function $_neg
        set,reservedGCGDisabled,false
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
    function $
        // Set color to blue
        printc,@CLS,@BLUB
        // Print the entire readme
        printc,tH,tI0,tI1,tI2,tI3,tS,tI4,tI5,tI6,tI7,tI8,tS,tI9,tI10,tI11,tI12,tI13,tS,tI14,tI15,tI16,tI17,tS,tI18,tI19,tE,@_,2n
    end
    // Fallback: automatically start the game on any command
    function $_f
        set,reservedGCGDisabled,false
        print,@CLS
        scene,s01_premarch_exposition
    end
end
