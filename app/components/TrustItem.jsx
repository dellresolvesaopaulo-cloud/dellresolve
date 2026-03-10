export default function TrustItem({ icon, children }) {

  return (
    <div className="text-center">

      <div className="flex justify-center mb-4 text-blue-600">
        {icon}
      </div>

      <p className="text-gray-700 font-medium">
        {children}
      </p>

    </div>
  );

}