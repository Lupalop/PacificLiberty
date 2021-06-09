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

group _aff
    goto,$_f
end

group _neg
    goto,$_f
end

#------------------------------------------------------------------------------
# Actions [Custom]
#------------------------------------------------------------------------------

# Actions: Affirmative/Negative
action
    yes,y,sure,certainly,of course,no problem,yeah,yez|goto,_aff
    no,n,no way,nope,nawp,nah,not in a million years,never|goto,_neg
end
