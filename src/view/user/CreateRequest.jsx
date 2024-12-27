import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Navigation/FixedSidebar";

const CreateRequest = () => {
  const [Open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState("");

  const togglehandler = () => {
    setOpen(!Open);
  };

  const handleNumberQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value * 3);
  };

  return (
    <div>
      <Header togglehandler={togglehandler} />
      {Open && (
        <div className="fixed inset-0 top-20 bg-green-900 bg-opacity-100 z-50 ">
          <Sidebar />
        </div>
      )}
      <div className="flex min-h-screen">
        <div className="bg-green-900 max-w-60 w-full  md:block hidden">
          <Sidebar />
        </div>
        <main className="w-full">
          <div className="md:w-2/3 mx-auto my-5 ">
            <div className="p-10 text-center md:text-2lg">
              <h1 className="font-semibold text-3xl">CREATE REQUEST</h1>
              <br />
              <p className="text-gray-500">
                Please fill out the necessary details in the form below to
                submit your request.
              </p>
            </div>
            <div className="p-10 shadow-lg border-2 rounded border-gray-200">
              <form method="POST" action="#">
                <h1 className="font-semibold text-xl my-2">
                  Personal Information
                </h1>
                <hr className="my-4" />
                <div className="grid grid-cols-2 gap-2 items-center">
                  <label for="request-type">Name:</label>
                  <input
                    type="text"
                    disabled
                    name="request-type"
                    className="border-2 p-2 block w-full "
                  />
                  <label for="description">Organization's Position:</label>
                  <input
                    type="text"
                    disabled
                    name="description"
                    className="border-2 p-2 block w-full "
                  />
                </div>
                <h1 className="font-semibold text-xl my-2">Request Details</h1>

                <hr className="my-4" />
                <div className="grid grid-cols-2 gap-2 items-center">
                  <label for="request-type"> Type of Chicks:</label>
                  <select
                    required
                    name="request-type"
                    id="request-type"
                    className="border-2 p-2 block cursor-pointer w-full"
                  >
                    <option value="" disabled selected name="request-type">
                      Select Type of Chicks
                    </option>
                    <option value="mix">Mix</option>
                    <option value="">Broiler</option>
                    <option value="">Layer</option>
                  </select>
                  <label for="quantity">Number of Person:</label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={999}
                    onChange={handleNumberQuantity}
                    maxLength={3}
                    name="request-type"
                    className="border-2 p-2 block w-full"
                    placeholder="Number of Requesting"
                    pattern="\d{1,3}"
                  />
                  <label for="quantity">
                    Quantity:
                    <span className="text-sm font-mono text-red-500 mx-6">
                      Note: 3 chicks per person.
                    </span>
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    disabled
                    value={quantity}
                    name="request-type"
                    className="border-2 p-2 block w-full "
                    placeholder="Quantity of Chicks"
                  />

                  <label htmlFor="description">Request Description:</label>
                  <textarea
                    required
                    name="description"
                    id="description"
                    placeholder="Request Description..."
                    className="border-2 p-2 block w-full resize-none"
                  ></textarea>
                  <label htmlFor="attache-file">
                    Attach Request File or Letter:
                  </label>
                  <input type="file" className=" py-2 block w-full " required />
                  <label for="request-date">Request Date & Time:</label>
                  <input
                    required
                    type="datetime-local"
                    name="request-date"
                    className="border-2 p-2 block w-full "
                  />

                  <label htmlFor="request-location">Request Location:</label>
                  <select
                    required
                    name=""
                    id=""
                    className="border-2 p-2 block cursor-pointer w-full"
                  >
                    <option value="" disabled selected name="request-location">
                      Select Location
                    </option>
                    <option value="">Tagum City</option>
                    <option value="">Campostella</option>
                    <option value="">Sto. Tomas</option>
                  </select>
                  <button
                    className="border-2 p-2 rounded hover:bg-red-700 bg-green-900 text-white"
                    type="reset"
                  >
                    Clear
                  </button>
                  <button className="border-2 p-2 rounded hover:bg-green-600 bg-green-900 text-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default CreateRequest;
