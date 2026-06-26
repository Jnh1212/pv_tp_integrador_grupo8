import { useParams } from "react-router-dom";

const { id } = useParams();

useEffect(() => {
  const getCliente = async () => {
    const res = await fetch(`https://fakestoreapi.com/users/${id}`);
    const data = await res.json();
    setCliente(data);
  };

  getCliente();
}, [id]);
