import rawItems from './etsy.json'
import './App.css'
import Listing, { type ListingItem } from './components/Listing.tsx';

const items = (rawItems as ListingItem[]).filter(
  (i): i is ListingItem => !!i.url && !!i.MainImage && i.state === 'active'
);

function App() { 
  return (
    <div className="container">
      <Listing items={items} />        
    </div>
  )
}

export default App
