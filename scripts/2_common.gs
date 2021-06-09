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
    yes,y,sure,certainly,of course,no problem,yeah,yez|goto,$_aff
    no,n,no way,nope,nawp,nah,not in a million years,never|goto,$_neg
end
