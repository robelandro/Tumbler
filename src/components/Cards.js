import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Discover why our customers are smiling - take a peek at their happiness!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/male.png'
              text='"I was so impressed with the quick and reliable repair services I received through Tumbler! The platform connected me with a skilled local repairman who fixed my broken phone in no time. I saved so much time and money by avoiding expensive repair shops, and I would definitely recommend Tumbler to anyone in need of quick and hassle-free repairs."'
              label='Abiy Ahmed'
              path='/chat/@Eyob'
            />
            <CardItem
              src='images/female.png'
              text="I was hesitant to try Tumbler at first, but I'm so glad I did! The platform was easy to use, and I was able to find a reliable repairman who fixed my broken laptop with ease. The customer support team was also very helpful in answering my questions and guiding me through the process. I would definitely use Tumbler again for any future repair needs"
              label='Rahel Tesfaye'
              path='/chat/@Rahel'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
