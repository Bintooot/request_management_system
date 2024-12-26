import React from "react";

const Letter = (
  Recipient,
  RepPosition,
  Designation,
  Thru,
  ThruPosition,
  Address,
  Body,
  DivisionHeadName,
  Title,
  Organization
) => {
  return (
    <div className="h-[85vh] overflow-x-auto">
      <h2 className="text-center text-2xl p-2">Request Letter</h2>
      <hr />
      <div className="h-[104vh] ">
        <br />
        <p>Date</p>

        <p>Name of the Recipient:</p>
        <p>Designation:</p>
        <p>Company Name:</p>
        <p>Address:</p>
        <br />

        <p>Reason for writing a request letter</p>
        <br />
        <p>Dear Mr./Ms./Mrs. [Last Name],</p>
        <br />
        <p>
          In the first paragraph, I would like to introduce myself. My name is
          [Your Name], and I am [Your Designation] at [Your Company]. We
          specialize in [Brief Description of Your Company]. The purpose of this
          letter is to [Briefly mention the reason for your letter].
        </p>
        <br />
        <p>
          In the second paragraph, I would like to kindly request [State your
          request clearly]. This request is being made because [Provide reasons
          for your request]. In return, I would be happy to [Mention any return
          favor or benefit to the reader]. If there are any alternatives to this
          request, I would be open to discussing those as well. Additionally, if
          this matter requires further explanation, I would appreciate the
          opportunity to meet with you in person.
        </p>
        <br />
        <p>
          In the last paragraph, I want to thank you for considering my request.
          Should you need any further information or wish to discuss this
          matter, please feel free to contact me at [Your Contact Information].
        </p>
        <br />
        <br />
        <div>
          <p>Your's Sincerely,</p>
          <br />
          <p>[Your Signature]</p>
          <p>[Your Name]</p>
          <p>[Your Designation]</p>
          <p>[Your Company]</p>
        </div>
      </div>
    </div>
  );
};

export default Letter;
