import { useState } from 'react';

export default function FilterableCourses({ COURSES }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly} />
            <ProductTable
                COURSES={COURSES}
                filterText={filterText}
                inStockOnly={inStockOnly} />
        </div>
    );
}

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    );
}

function ProductRow({ COURSES }) {
    const name = COURSES.stocked ? COURSES.name :
        <span style={{ color: 'red' }}>
            {COURSES.name}
        </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{COURSES.price}</td>
        </tr>
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
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
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
            <input
                type="text"
                value={filterText} placeholder="Search..."
                onChange={(e) => onFilterTextChange(e.target.value)} />
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)} />
                {' '}
                Only show products in stock
            </label>
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