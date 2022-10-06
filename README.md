Supabase:
id - int8 key
user_id
restaurant 
rating
description

------------------------------------------
last user story 
Reviews.js maps out all reviews from SUpa

User creates/edits review -1 component - sends to supabase
    - 4 inputs rest, rate, description
        -button - submit
    -NavLinks (inside review)
            - review navlink: edit
                    - delete button <Redirect to = Reviews.js>
            - header navlink: create 

-finish service file to fetch review by ID 

-SupaBase function to create review & Delete
            
Try to implement rating system from MUI

            SUPABASE RLS

            ---------------------------------

            10/6
Navlinks
Create post - similar to EditReviews
delete post - useEffect function to rerender page after delete 