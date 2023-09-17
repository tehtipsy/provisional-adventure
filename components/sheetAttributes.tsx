import { useContext, useState } from "react";
import { CharacterContext } from "@/contexts/characterContext";

const initialAttributeDisplayCols = [
  "att.",
  "total",
  "base",
  "t1",
  "t2",
  "t3",
  "t4",
  "bonus",
];

export const SheetAttributes: React.FC = (): JSX.Element => {
  const [attributeDisplayCols] = useState(initialAttributeDisplayCols);
  const { attributes, attributesTotals } = useContext(CharacterContext);
  if (attributes && attributesTotals) {
    return (
      <div key={`sheet-attributes-component-div`}>
        <div className="flex-row justify-center">
          <ul>
            <div className="px-4 grid grid-cols-8 gap-1">
              {Object.entries(attributeDisplayCols).map(([key, value]) => (
                <div key={`div-${key}-display-cols`}>{value}</div>
              ))}
            </div>
            {Object.keys(attributes).map((attribute) => (
              <div key={`div-${attribute}`}>
                <li key={`li-${attribute}`}>
                  <div className="px-4 grid grid-cols-8 gap-1 border-t-2 border-r-2 border-l-2 border-gray-500">
                    <div className="px-2">
                      <h1>{attribute.slice(0, 3).toUpperCase()}</h1>
                    </div>
                    <div className="px-4 grid grid-cols-2 gap-1">
                      <div className="px-1">
                        {Array(Math.abs(attributesTotals[attribute]))
                          .fill(0)
                          .map((_, i) => (
                            <div key={`total-${i}-div`} className="py-1">
                              <div
                                className={
                                  attributesTotals[attribute] > 0
                                    ? "w-3 h-3 rounded-full bg-green-700"
                                    : "animate-pulse w-3 h-3 rounded-full bg-red-700"
                                }
                                key={`total-${i}-circle`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="px-4 grid grid-cols-2 gap-1">
                      <div className="px-1">
                        {Array(Math.abs(attributes[attribute].unmodifiedValue))
                          .fill(0)
                          .map((_, i) => (
                            <div key={`base-${i}-div`} className="py-1">
                              <div
                                className="w-3 h-3 rounded-full bg-blue-700"
                                key={`base-${i}-circle`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="px-4 grid grid-cols-2 gap-1">
                      <div className="px-1">
                        {Array(Math.abs(attributes[attribute].t1))
                          .fill(0)
                          .map((_, i) => (
                            <div key={`tier-1-${i}-div`} className="py-1">
                              <div
                                className="w-3 h-3 rounded-full bg-red-700"
                                key={`tier-1-${i}-circle`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="px-4 grid grid-cols-2 gap-1">
                      <div className="px-1">
                        {Array(Math.abs(attributes[attribute].t2))
                          .fill(0)
                          .map((_, i) => (
                            <div key={`tier-2-${i}-div`} className="py-1">
                              <div
                                className="w-3 h-3 rounded-full bg-red-700"
                                key={`tier-2-${i}-circle`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="px-4 grid grid-cols-2 gap-1">
                      <div className="px-1">
                        {Array(Math.abs(attributes[attribute].t3))
                          .fill(0)
                          .map((_, i) => (
                            <div key={`tier-3-${i}-div`} className="py-1">
                              <div
                                className="w-3 h-3 rounded-full bg-red-700"
                                key={`tier-3-${i}-circle`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="px-4 grid grid-cols-2 gap-1">
                      <div className="px-1">
                        {Array(Math.abs(attributes[attribute].t4))
                          .fill(0)
                          .map((_, i) => (
                            <div key={`tier-4-${i}-div`} className="py-1">
                              <div
                                className="w-3 h-3 rounded-full bg-red-700"
                                key={`tier-4-${i}-circle`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="px-4 grid grid-cols-2 gap-1">
                      <div className="px-1">
                        {Array(Math.abs(attributes[attribute].bonus))
                          .fill(0)
                          .map((_, i) => (
                            <div key={`bonus-${i}-div`} className="py-1">
                              <div
                                className="w-3 h-3 rounded-full bg-purple-700"
                                key={`bonus-${i}-circle`}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            ))}
            <div className="border-b-2 border-gray-500"></div>
          </ul>
        </div>
      </div>
    );
  } else {
    return <div>{"Attributes are Borked in CharacterContext"}</div>;
  }
};

export default SheetAttributes;
