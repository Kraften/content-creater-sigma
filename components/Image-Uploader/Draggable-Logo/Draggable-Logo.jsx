import { useDraggable } from "@dnd-kit/core";
import styles from "./Draggable-Logo.module.scss";
import Image from "next/image";

const DraggableLogo = ({ logo, position, onPositionChange }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-logo",
  });

  // const style = {
  //   top: position.top,
  //   left: position.left,
  //   transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
  // };

  const style = {
    top: position.top + (transform?.y || 0),
    left: position.left + (transform?.x || 0),
  };

  return (
    <Image
      ref={setNodeRef}
      className={styles.logoImage}
      src={logo}
      alt="Logo"
      style={{
        ...style,
      }}
      {...listeners}
      {...attributes}
    />
  );
};
export default DraggableLogo;
