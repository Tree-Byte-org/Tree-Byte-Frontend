import { Trees } from "lucide-react";

export default function TokensSection() {
  const tokens = [
    { name: "CAOBA" },
    { name: "ALMENDRO" },
    { name: "SAUCE LLORÓN" },
    { name: "CENÍZARO" },
    { name: "ESPABEL" },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
          Latest tokens acquired
        </h3>
        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          Show all tokens...
        </button>
      </div>

      <div className="flex justify-between items-center">
        {tokens.map((token, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mb-2">
              <Trees className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wide text-center">
              {token.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
