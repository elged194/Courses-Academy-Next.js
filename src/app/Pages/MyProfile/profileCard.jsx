"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import { useContext } from "react";

const ProfileCard = () => {
  const { userProduct } = useContext(DashboardContext);

  return (
    <>
      <section className="w-full my-3 rounded  mx-auto  ">
        <div className="flex flex-col mt-2">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                {/* table */}
                <table
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                  id="table-to-pdf"
                >
                  {/* table head */}
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-extrabold text-left rtl:text-right text-gray-700 "
                      >
                        <div className="flex items-center gap-x-3">
                          <span>File name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-extrabold text-left rtl:text-right text-gray-700 "
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-extrabold text-left rtl:text-right text-gray-700 "
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm  text-left rtl:text-right text-gray-700 font-extrabold"
                      >
                        Order Date
                      </th>
                    </tr>
                  </thead>

                  {/* table body */}
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 ">
                    {userProduct ? (
                      userProduct?.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div className="flex items-center justify-center text-blue-500 bg-blue-100  ">
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={300}
                                    height={300}
                                    className="w-24 "
                                  />
                                </div>
                                <div>
                                  {/* title  */}
                                  <h2 className="font-normal text-gray-800  ">
                                    {item.title}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                            {item.id}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            ${item.price}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            Jan 4, 2022
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center w-full">
                        The order has not been made yet
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
