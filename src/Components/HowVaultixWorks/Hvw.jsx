import { CgProfile } from "react-icons/cg";
import { GiMoneyStack } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineManageAccounts } from "react-icons/md";
import "./Hvw.css"

function Hvw() {
  return (
    <div className='hvw'>
        <div className="heading">
            <h3>How Vaultix Works</h3>
        </div>

        <div className="box">
            <div className="one">
                        <CgProfile />
                        <h1>Create a Profile</h1>
                        <p>
                            Sign up in just a few minutes to get started. 
                            Set up your profile and secure your account with 
                            our advanced encryption.
                        </p>
                    </div>
                    <div className="two">
                        <GiMoneyStack />
                        <h1>Add Funds</h1>
                        <p>
                        Deposit money into your Vaultix account through our seamless 
                        integration with Paystack.
                        Additionally, any money sent from another Vaultix user 
                        is automatically deposited into your account.
                        </p>
                    </div>
                    <div className="three">
                        <GrTransaction />
                        <h1>Make Transactions</h1>
                        <p>
                        Send and receive money effortlessly. Whether it's paying a friend,
                        splitting a bill, or making online purchases, 
                        Vaultix makes it quick and easy.
                        </p>
                    </div>
                    <div className="four">
                        <MdOutlineManageAccounts />
                        <h1>Track $ Manage</h1>
                        <p>
                        Monitor your transactions with real-time updates. 
                        Access detailed reports and manage your finances all in one place.
                        </p>
                    </div>
                </div>
    </div>
  )
}

export default Hvw