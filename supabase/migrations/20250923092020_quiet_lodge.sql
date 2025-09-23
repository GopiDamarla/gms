/*
  # Database Function to Increment Class Participants

  This function increments the current_participants count when a class is booked.
*/

CREATE OR REPLACE FUNCTION increment_class_participants(
  class_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE classes 
  SET current_participants = current_participants + 1
  WHERE id = class_id;
END;
$$;