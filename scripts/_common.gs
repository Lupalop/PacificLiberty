#<
   © Lupalop Games - All Rights Reserved
   Unauthorized copying of this file, via any medium is strictly prohibited
   Proprietary and confidential
   
   Contributor(s):
     Francis Dominic Fajardo <fofajardo@student.apc.edu.ph>, June 2021
#>

#------------------------------------------------------------------------------
# Strings
#------------------------------------------------------------------------------

# ASCII color codes
string
    # Common
    @_|\e
    @CLS|\e[H\e[2J
    @UE|\e[4m
    @UD|\e[24m
    @BE|\e[1m
    @BD|\e[21m
    # Regular text
    @BLK|\e[0;30m
    @RED|\e[0;31m
    @GRN|\e[0;32m
    @YEL|\e[0;33m
    @BLU|\e[0;34m
    @MAG|\e[0;35m
    @CYN|\e[0;36m
    @WHT|\e[0;37m
    # Regular bold text
    @BBLK|\e[1;30m
    @BRED|\e[1;31m
    @BGRN|\e[1;32m
    @BYEL|\e[1;33m
    @BBLU|\e[1;34m
    @BMAG|\e[1;35m
    @BCYN|\e[1;36m
    @BWHT|\e[1;37m
    # Regular underline text
    @UBLK|\e[4;30m
    @URED|\e[4;31m
    @UGRN|\e[4;32m
    @UYEL|\e[4;33m
    @UBLU|\e[4;34m
    @UMAG|\e[4;35m
    @UCYN|\e[4;36m
    @UWHT|\e[4;37m
    # Regular background
    @BLKB|\e[40m
    @REDB|\e[41m
    @GRNB|\e[42m
    @YELB|\e[43m
    @BLUB|\e[44m
    @MAGB|\e[45m
    @CYNB|\e[46m
    @WHTB|\e[47m
    # High intensty background 
    @BLKHB|\e[0;100m
    @REDHB|\e[0;101m
    @GRNHB|\e[0;102m
    @YELHB|\e[0;103m
    @BLUHB|\e[0;104m
    @MAGHB|\e[0;105m
    @CYNHB|\e[0;106m
    @WHTHB|\e[0;107m
    # High intensty text
    @HBLK|\e[0;90m
    @HRED|\e[0;91m
    @HGRN|\e[0;92m
    @HYEL|\e[0;93m
    @HBLU|\e[0;94m
    @HMAG|\e[0;95m
    @HCYN|\e[0;96m
    @HWHT|\e[0;97m
    # Bold high intensity text
    @BHBLK|\e[1;90m
    @BHRED|\e[1;91m
    @BHGRN|\e[1;92m
    @BHYEL|\e[1;93m
    @BHBLU|\e[1;94m
    @BHMAG|\e[1;95m
    @BHCYN|\e[1;96m
    @BHWHT|\e[1;97m
end

# Common messages
string
    # Fallback
    f_1|I don't understand that!
    f_2|I don't know that word.
    f_3|What?
    f_4|You're confusing!
    # Talk
    t_1|There's nobody in here.
    t_2|There's no one to talk to.
    # Walk
    w_1|Where?
    w_2|May I know which direction?
    # Look/View
    l_1|There's nothing here.
    l_2|I don't know what you're looking for.
    l_3|What are you looking for?
    l_4|See what exactly?
    # Taking objects
    o_1|Take what?
    o_2|I don't see that object here.
    o_3|I'm not a magician.
    o_4|I can't pick something that isn't here.
    # Inventory
    i_1|This item is already in your inventory!
    i_2|This item is NOT in your inventory!
    i_3|You only have one item in your inventory:
    i_4|You have %s items in your inventory:%n
    i_5|%s: %s%n
    i_6|Your inventory is empty!
    # Points
    p_1|You currently have %s of %s points.%n
    # Save/Load Game
    sl_1|Enter the name of your saved game:
    sl_2|Invalid name.
    sl_3|Name too long! Try a shorter name for your saved game.
    sl_4|The specified saved game was not found.
    sl_5|Your game has been loaded!
    sl_6|Your game cannot be saved.
    sl_7|Your game has been saved!
    # Game over
    go_0|Game over.
    go_1|Better luck next time!
    go_2|Perhaps you'll fare better if you restart.
    go_3|You might have missed something, think about it. Seriously.
    go_4|Look at the time! Sleep now, and try again in the morning.
end

#------------------------------------------------------------------------------
# Command groups
#------------------------------------------------------------------------------

#<
  Reserved switches:
    0: disable all reserved global command groups
    1: inventory and points access
    2: interactions
    3: game state load/save
#>

# Common: Unknown commands
group $_f
    printr,f_1,f_2,f_3,f_4
end
# Common: Inventory access
group $_i
    if !0,!1
        inv,list
    else
        goto,$_f
    end
end
# Common: Points access
group $_p
    if !0,!1
        points,list
    else
        goto,$_f
    end
end
# Common: Game over
group $_go
    if !0
        printc,%n,@BRED,go_0,@WHT,%n%n
        points,list
        printc,%n,@BRED,@UE
        printr,go_1,go_2,go_3,go_4
        printc,%n,@UD,@WHT
        quit
    else
        goto,$_f
    end
end
# Interaction: Talk
group $_t
    if !0,!2
        printr,t_1,t_2
    else
        goto,$_f
    end
end
# Interaction: Walk/Run
group $_w
    if !0,!2
        printr,w_1,w_2
    else
        goto,$_f
    end
end
# Interaction: Look/View/See
group $_l
    if !0,!2
        printr,l_1,l_2,l_3,l_4
    else
        goto,$_f
    end
end
# Interaction: Taking objects
group $_o
    if !0,!2
        printr,o_1,o_2,o_3,o_4
    else
        goto,$_f
    end
end
# State: Save game
group $_ss
    if !0,!3
        save
    else
        goto,$_f
    end
end
# State: Load game
group $_sl
    if !0,!3
        load
    else
        goto,$_f
    end
end

#------------------------------------------------------------------------------
# Actions
#------------------------------------------------------------------------------

# Actions: Common/State
action
    fallback|goto,$_f
    inventory,check inventory,get inventory,inv,check inv,get inv|goto,$_i
    bag,check bag,get bag|goto,$_i
    score,check score,view score|goto,$_p
    points,check points,view points|goto,$_p
    save|goto,$_ss
    load|goto,$_sl
    quit|quit
end

# Actions: Interactions
action
    talk,converse,chat,speak|goto,$_t
    talk to,talk with,converse to,converse with,chat to,chat with,speak to,speak with|goto,$_t
    walk,run|goto,$_w
    pick,take,get,snatch,grasp,pull,reach|goto,$_o
    look,look around,look surroundings,look at,look place|goto,$_l
    see,see around,see surroundings,see place|goto,$_l
    view,view around,view surroundings,view place|goto,$_l
    check,check around,check surroundings,check place|goto,$_l
end
