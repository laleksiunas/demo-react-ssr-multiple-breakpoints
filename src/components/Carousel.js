import { useState } from 'react';

import styles from '../theme/components/carousel.module.scss';

const Carousel = ({ items = [], itemsPerPage, itemHeight, itemWidth }) => {
  const [firstColumnIndex, setFirstColumnIndex] = useState(0);

  if (items.length === 0) {
    return null;
  }

  const updateIndex = (newIndex) =>
    setFirstColumnIndex(newIndex < 0 ? items.length + newIndex : newIndex % items.length);

  const viewItems = items
    .slice(firstColumnIndex, firstColumnIndex + itemsPerPage)
    .concat(items.slice(0, Math.max(firstColumnIndex + itemsPerPage - items.length, 0)));

  return (
    <div>
      <div className={styles.wrapper}>
        {viewItems.map((x) => (
          <div
            key={x.title}
            style={{ minHeight: itemHeight, minWidth: itemWidth, backgroundColor: x.backgroundColor }}
            className={styles.item}
          >
            {x.title}
          </div>
        ))}
      </div>
      <div>
        <button className={styles.action} onClick={() => updateIndex(firstColumnIndex - 1)}>Previous</button>
        <button className={styles.action} onClick={() => updateIndex(firstColumnIndex + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;
