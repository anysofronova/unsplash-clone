import { useAuth } from "../../hooks/useAuth";

export interface IImage {
  id: number;
  title: string;
  url: string;
}
const imgListGeneral: IImage[] = [
  {
    id: 0,
    title: "0",
    url: "https://avatars.mds.yandex.net/i?id=8ac5c6407bf12fa0dfc4bce7f4bbc2d7-6202122-images-thumbs&n=13",
  },
  {
    id: 1,
    title: "1",
    url: "http://images.unsplash.com/photo-1552223919-66b8d825749e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
  },
  {
    id: 2,
    title: "2",
    url: "https://i.pinimg.com/originals/d1/d0/a1/d1d0a176e6b2b3f883c6414c00ce7950.jpg",
  },
  {
    id: 3,
    title: "3",
    url: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?ixlib=rb-0.3.5&amp;q=50&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=720&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjEyMjZ9&amp;s=1ea22a373bd78c235711ba8c35698259",
  },
  {
    id: 4,
    title: "4",
    url: "https://images.squarespace-cdn.com/content/v1/60e606b835f3500d5f07ab6c/1626201764246-62I2QW8MGDEEWROAWDCU/nathan-mcbride-RP6Ba_6U154-unsplash.jpg",
  },
];

const imgListPersonal: IImage[] = [
  {
    id: 0,
    title: "0",
    url: "https://www.petstay.net/wp-content/uploads/2018/05/adorable-animal-breed-356378-1-e1527077850776.jpg",
  },
];

const Home = () => {
  const auth = useAuth();
  return (
    <div>
      {auth.isAuth
        ? imgListPersonal.map((i) => (
            <div key={i.id}>
              <img src={i.url} alt={i.title} />
            </div>
          ))
        : imgListGeneral.map((i) => (
            <div key={i.id}>
              <img src={i.url} alt={i.title} />
            </div>
          ))}
    </div>
  );
};

export default Home;
