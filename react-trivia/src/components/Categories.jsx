function Categories({ trivCatData, handleCategory }) {
  return (
    <div>
      {trivCatData.map((trivCat) => (
        <button key={trivCat.id} onClick={() => handleCategory(trivCat)}>
          {trivCat.name}
        </button>
      ))}
    </div>
  );
}

export default Categories;
