/*
  # Database Function to Update Member Payment

  This function updates a member's amount_paid when a new payment is recorded.
*/

CREATE OR REPLACE FUNCTION update_member_payment(
  member_id uuid,
  payment_amount decimal
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE members 
  SET amount_paid = amount_paid + payment_amount
  WHERE id = member_id;
END;
$$;