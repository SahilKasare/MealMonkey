
const CustomerDashboard = () => {
    return(
        <div>
            <h1 className="text-3xl font-bold text-center text-gray-800">userDashboard</h1>
        {/* <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-500 to-red-600 overflow-hidden -mt-16"> Added -mt-16 to move upward */}
      {/* Background food image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://source.unsplash.com/1600x900/?food" 
          alt="Food background" 
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
      </div>
    {/* </div> */}
        </div>
    )
}

export default CustomerDashboard