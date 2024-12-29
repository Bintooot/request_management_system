import { useState } from "react";
import { create } from "zustand";

export const createContactUs = create((set) => ({
  contact: [],
  createContact: async (newContact) => {
    if(!newContact.name || !newContact.email || !newContact.subject || !newContact.message ||){
        return {success:false, message: "Fill all the input field"}
    }
    const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
            "Content-Type" : "application/jason"
        },
        body: JSON.stringify(newContact)
    })
    const data = await res.json();
    set((state) => ({contact: [...state.contact, data.data]}))
     return {success:true, message: "Form has been send"}
  } 
}));
