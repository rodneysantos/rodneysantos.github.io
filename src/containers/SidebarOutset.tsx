import cn from "classnames";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface SidebarOutsetProps {
  value: boolean;
}

interface SidebarOutsetContextProps {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
}

export const SidebarOutsetContext = createContext<SidebarOutsetContextProps>({
  isVisible: false,
  setIsVisible: () => {},
});

export const useSidebarOutset = () => useContext(SidebarOutsetContext);

const SidebarOutset: React.FC<SidebarOutsetProps & PropsWithChildren> = ({
  children,
  value,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(value);
  const cns = cn(
    "flex",
    "fixed",
    "font-dosis",
    "h-screen",
    "transition-transform",
    { "-translate-x-[90%]": !isVisible },

    "lg:duration-200",

    "3xl:duration-300",
  );

  return (
    <>
      <SidebarOutsetContext.Provider value={{ isVisible, setIsVisible }}>
        <div className={cns}>{children}</div>
      </SidebarOutsetContext.Provider>
    </>
  );
};

export default SidebarOutset;
