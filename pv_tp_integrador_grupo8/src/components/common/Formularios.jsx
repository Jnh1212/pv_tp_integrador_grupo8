import { useState } from 'react';

export const Formularios = ({ cerrarModal, agregarCliente }) => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        phone: '',
        city: ''
    });

    const [alerta, setAlerta] = useState({ mostrar: false, tipo: '', mensaje: '' });
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const respuesta = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: 'password123',
                    name: {
                        firstname: formData.username,
                        lastname: '(Nuevo)'
                    },
                    address: {
                        city: formData.city,
                        street: 'Calle Falsa',
                        number: 1,
                        zipcode: '0000',
                        geolocation: { lat: '0', long: '0' }
                    },
                    phone: formData.phone
                })
            });

            if (respuesta.status === 200 || respuesta.status === 201) {
                const datos = await respuesta.json();

                const clienteParaTabla = {
                    id: datos.id,
                    email: formData.email,
                    phone: formData.phone,
                    name: {
                        firstname: formData.username,
                        lastname: '(Nuevo)'
                    },
                    address: {
                        city: formData.city
                    }
                };

                if (agregarCliente) {
                    agregarCliente(clienteParaTabla);
                }

                setAlerta({
                    mostrar: true,
                    tipo: 'success',
                    mensaje: `¡Cliente creado con éxito! ID asignado: ${datos.id}`
                });

                setFormData({ email: '', username: '', phone: '', city: '' });

                setTimeout(() => {
                    cerrarModal();
                }, 2000);

            } else {
                throw new Error('Error en el servidor');
            }

        } catch (error) {
            setAlerta({
                mostrar: true,
                tipo: 'error',
                mensaje: 'Hubo un error al crear el cliente.'
            });
        } finally {
            setCargando(false);
            setTimeout(() => {
                setAlerta({ mostrar: false, tipo: '', mensaje: '' });
            }, 4000);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Alta de Cliente</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de Usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px' }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px' }}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px' }}
                />

                <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px' }}
                >
                    <option value="" disabled>Selecciona una ciudad</option>
                    <option value="San Salvador de Jujuy">San Salvador de Jujuy</option>
                    <option value="Humahuaca">Humahuaca</option>
                    <option value="Palpalá">Palpalá</option>
                    <option value="San Pedro">San Pedro</option>
                </select>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                        type="button"
                        onClick={cerrarModal}
                        style={{ flex: 1, padding: '10px', cursor: 'pointer' }}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={cargando}
                        style={{ flex: 1, padding: '10px', cursor: cargando ? 'not-allowed' : 'pointer' }}
                    >
                        {cargando ? 'Guardando...' : 'Crear Cliente'}
                    </button>
                </div>
            </form>

            {alerta.mostrar && (
                <div style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: alerta.tipo === 'success' ? '#d4edda' : '#f8d7da',
                    color: alerta.tipo === 'success' ? '#155724' : '#721c24',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    {alerta.mensaje}
                </div>
            )}
        </div>
    );
};