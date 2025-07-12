import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useSearchParams } from 'react-router-dom';

const STORAGE_KEY = 'data-aksa-app';

const CrudPages = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchParams, setSearchParams] = useSearchParams();



  // 🔁 Load query string saat pertama kali halaman render
  useEffect(() => {
    const savedSearch = searchParams.get('search') || '';
    const savedPage = parseInt(searchParams.get('page')) || 1;
    const savedLimit = parseInt(searchParams.get('limit')) || 5;

    setSearchQuery(savedSearch);
    setCurrentPage(savedPage);
    setItemsPerPage(savedLimit);
  }, []);

  // 🔁 Sinkronkan query string saat state berubah
  useEffect(() => {
    setSearchParams({
      search: searchQuery,
      page: currentPage,
      limit: itemsPerPage,
    });
  }, [searchQuery, currentPage, itemsPerPage, setSearchParams]);

  // 🔁 Reset ke page 1 jika search atau limit berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setData(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !age) return;

    const newItem = {
      id: Date.now(),
      name,
      age,
    };

    setData((prev) => [...prev, newItem]);
    setName('');
    setAge('');
  };

  const handleDelete = (id) => {
    const filtered = data.filter((item) => item.id !== id);
    setData(filtered);
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Manajemen Data</h2>

        <form onSubmit={handleAdd} className="mb-6 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder="Usia"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Tambah
          </button>
        </form>

        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <input
              type="text"
              placeholder="Cari Nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
            />

            <div className="flex items-center gap-2">
              <label htmlFor="perPage" className="text-gray-800 dark:text-white">Tampilkan</label>
              <select
                id="perPage"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded p-2 dark:bg-gray-700 dark:text-white"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>


        {/* Tabel */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-2 border dark:border-gray-600">No</th>
              <th className="p-2 border dark:border-gray-600">Nama</th>
              <th className="p-2 border dark:border-gray-600">Usia</th>
              <th className="p-2 border dark:border-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500 dark:text-gray-300">
                  Tidak ada data yang cocok.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="p-2">{startIndex + index + 1}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.age}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded disabled:opacity-50"
          >
            Sebelumnya
          </button>

          <span className="text-gray-800 dark:text-white">
            Halaman {currentPage} dari {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </>
  );
};

export default CrudPages;
