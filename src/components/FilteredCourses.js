import { useState } from 'react';
import '../App.css';

export default function FilterableCourses({ COURSES }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div className='searchcenter'>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
                className="searchUI"
                />
            <ProductTable
                COURSES={COURSES}
                filterText={filterText}
                inStockOnly={inStockOnly} />
        </div>
    );
}

function ProductCategoryRow({ category }) {
    return (
        <div className='catcolor'>
             {category}
        </div>
    );
}

function ProductRow({ COURSES }) {
    const name = COURSES.stocked ? COURSES.name :
        <span style={{ color: 'black' }}>
            {COURSES.name}
        </span>;

    return (
        
            <div className='nameprice'>
            <div >{name}</div>
            <div>{COURSES.price}</div>
            </div>
        
    );
}

function ProductTable({ COURSES, filterText, inStockOnly }) {
    const rows = [];
    let lastCategory = null;

    COURSES.forEach((COURSES) => {
        if (
            COURSES.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (inStockOnly && !COURSES.available) {
            return;
        }
        if (COURSES.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={COURSES.category}
                    key={COURSES.category} />
            );
        }
        rows.push(
            <ProductRow
                COURSES={COURSES}
                key={COURSES.name} />
        );
        lastCategory = COURSES.category;
    });

    return (
        <>
        <div className='nameprice'>
        <div>Name</div>
        <div className=''>Price</div>
        </div>
        <div>{rows}</div>
        </>
    );
}

function SearchBar({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange
}) {
    return (
        <form>
            <div className='inputfield'>
            <span>Search</span>
            <input
                type="text"
                className='searchUI'
                value={filterText} placeholder="Search Course"
                onChange={(e) => onFilterTextChange(e.target.value)} />
            </div>
            <div className='textinput'>
            <label>
                <input
                   
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)} />
                {' '}
                Only show products in stock
            </label>
            </div>
        </form>
    );
}

// const PRODUCTS = [
//   {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
//   {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
//   {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
//   {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
//   {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
//   {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
// ];
