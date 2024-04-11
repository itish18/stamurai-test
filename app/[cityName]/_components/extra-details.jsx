export const ExtraDetails = ({ icon, label, value }) => {
  return (
    <div className="flex gap-8 items-center px-10 py-8 rounded-lg bg-black/50 backdrop-blur-lg">
      {icon}
      <div className="flex flex-col gap-4">
        <p className="text-slate-200">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};
