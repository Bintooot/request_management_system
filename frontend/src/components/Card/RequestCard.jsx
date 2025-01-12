import React from "react";

const RequestCard = ({ items }) => {
  return (
    items && (
      <div className="border-2 md:w-2/3 w-full my-2 rounded-lg shadow-lg">
        <h1 className="text-center p-3 font-semibold text-xl bg-gray-50 border-b">
          Current Request Details
        </h1>
        <div className="p-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Request No</p>
              <p className="font-medium"> {items.requestId}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <span className="inline-flex px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                {items.status}
              </span>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Type of Chicks</p>
              <p className="font-medium">{items.typeOfChicks}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Quantity</p>
              <p className="font-medium">{items.quantityOfChicks} chicks</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Number of Persons</p>
              <p className="font-medium">{items.numberOfPerson} persons</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Requested Date</p>
              <p className="font-medium">{items.requestedDate}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600 text-sm">Description</p>
            <p className="font-medium">{items.requestDescription}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default RequestCard;
