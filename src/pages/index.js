import { themes, useTheme, SsrAdditionalThemes, breakpoints } from '../theme';
import { Carousel } from '../components';

const carouselItems = Array.from({ length: 15 }, (_, index) => ({
  title: index,
  backgroundColor: '#616161'
}));

const getCarouselConfiguration = (theme) => {
  switch (theme) {
    case themes.xl:
      return { itemWidth: 350, itemHeight: 500, itemsPerPage: 5 };

    case themes.lg:
      return { itemWidth: 250, itemHeight: 400, itemsPerPage: 5 };

    case themes.md:
      return { itemWidth: 200, itemHeight: 300, itemsPerPage: 4 };

    case themes.sm:
      return { itemWidth: 200, itemHeight: 300, itemsPerPage: 3 };

    default:
      return { itemWidth: 100, itemHeight: 200, itemsPerPage: 3 };
  }
};

const ThemedCarousel = ({ items }) => {
  const theme = useTheme();

  return <Carousel items={items} {...getCarouselConfiguration(theme)} />;
};

const ThemedTitle = () => <h1>Simple carousel{useTheme() < themes.md ? ' (mobile view)' : ''}</h1>;

const Index = () => (
  <div>
    <SsrAdditionalThemes themes={[themes.sm]}>
      <ThemedTitle />
    </SsrAdditionalThemes>
    <SsrAdditionalThemes themes={breakpoints}>
      <ThemedCarousel items={carouselItems} />
    </SsrAdditionalThemes>
    <p>Footer</p>
  </div>
);

export default Index;
