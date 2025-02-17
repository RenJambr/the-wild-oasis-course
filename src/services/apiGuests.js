import supabase from "./supabase";

export async function createGuest(newGuest) {
  // 1. Create a guest
  const { data, error } = await supabase
    .from("guests")
    .insert(newGuest)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Guest could not be created.");
  }

  return data;
}

export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) {
    throw new Error("Guest not found");
  }

  return data;
}
