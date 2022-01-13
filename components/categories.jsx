import React from 'react';

function Categories(props) {
  const {categories} = props
  return (
    <div className="catMenu">
      {categories.length &&
        categories.map((category, index) => {
          return (
            <a key={index} href="#">{category.name}</a>
          )
        })
      }
      <a href="#">All</a>
    </div>
  );
}

export default Categories;