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
        99_end_l0|THE END.%n%n1945, after the long march, POWs are now free from the hands of the Japanese.%nYou were filled with glad, hope, and liberty. You find yourself weeping after%nthe miserable and tormenting walk. The cruelty finally came to an end.
        99_end_a0|Created by:%nFrancis Fajardo, Rachel Manlapig, Cecille Milan, TJ Sayson, and Georgette Tulod
        99_end_a1|You may type `quit` to quit the game.
    end
    // LGO: Entry
    function $
        set,0,true
        printc,99_end_l0,2n
        inv,list
        points,list
        printc,1n,99_end_a0,2n,99_end_a1,1n
    end
end
