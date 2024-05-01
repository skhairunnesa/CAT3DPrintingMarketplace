/* Author: Isa Luluquisin
// Description: Dummy page for myAccount
*/

import React from "react";
 
const MyAccount = () => {
    return (
        <div>
            <h1>
                Insert option to choose between seller and buyer page here!
            </h1>
            <button onClick={() =>  window.location.href='/sellerPage'}>
                Seller Page
                </button>
        </div>
    );
};
 
export default MyAccount;