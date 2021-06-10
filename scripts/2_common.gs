#< @FILE: 2_common.gs
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>, June 2021
#>

#------------------------------------------------------------------------------
# Strings
#------------------------------------------------------------------------------

string
    # In-game tips
    tip_01|You can access the inventory by typing "inv" or "inventory".
end

#------------------------------------------------------------------------------
# Command groups [Tips]
#------------------------------------------------------------------------------

group tip_01
    printc,@HGRN,%n,tip_01,%n,@_
end

#------------------------------------------------------------------------------
# Command groups [Temporary]
#------------------------------------------------------------------------------

# Replacements for missing gotob (go to base group command)
# XXX: Keep in sync with 1_platform.gs
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

#------------------------------------------------------------------------------
# Command groups [Custom]
#------------------------------------------------------------------------------

# Interaction: affirmative response
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

# Interaction: negative response
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

#------------------------------------------------------------------------------
# Actions [Custom]
#------------------------------------------------------------------------------

# Actions: Affirmative/Negative
action
    yes,y,sure,certainly,of course,no problem,yeah,yez,talk yes|goto,$_aff
    no,n,no way,nope,nawp,nah,not in a million years,never,talk no|goto,$_neg
end
