import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../helpers/AuthContext";
import {ErrorMessage, Field, Form, Formik} from "formik";

function EditRegistros(){

    let { id } = useParams();
    let navigate = useNavigate();
    const [registro, setRegistro] = useState({});
    const [registroAUX, setRegistroAUX] = useState({});
    const hoy = new Date(Date.now());
    const fechaString = hoy.toLocaleDateString();
    const { authState } = useContext(AuthContext);

    const auxiliarId = authState.id;

    const auxId = {auxiliarId};


    useEffect(() => {

        axios.get(`http://localhost:3001/registrosDiarios/showRegistro/${id}?fecha=${fechaString}`,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                setRegistro(response.data);
            });


        axios.get(`http://localhost:3001/registrosDiarios/auxiliarRegistro/${id}?fecha=${fechaString}`,
            {headers: {accessToken: localStorage.getItem("accessToken")},

            })
            .then((response) => {

                if(response.data.error) {
                    console.log(response.data.error);
                } else {
                    setRegistroAUX(response.data);
                    console.log(response);
                }

            });



    }, [])

    const registroId = registro.id;


    console.log(" objeto " + Object.entries(registroAUX).length);

    console.log(registroId);

    console.log(auxiliarId);

    const initialValues = {
        desayuno: registro.desayuno,
        almuerzo: registro.almuerzo,
        merienda: registro.merienda,
        cena: registro.cena,
        pasosDiarios: registro.pasosDiarios,
        actividadFisica: registro.actividadFisica,
        horasSueno: registro.horasSueno,
        tiempoAireLibre: registro.tiempoAireLibre,
        relacionSocial: registro.relacionSocial,
        PersonasDependienteId: id
    };




    const editRegistro = (data) => {

        axios.put(`http://localhost:3001/registrosDiarios/registro/edit/${registroId}`, data,
            {headers: {accessToken: localStorage.getItem("accessToken"),}})
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    navigate(`/personaDependiente/${id}`);
                }
            })

        if(registroAUX.length === 0){

            const auxiliarId = authState.id;

            axios.post(`http://localhost:3001/registrosDiarios/addAuxiliarRegistro/${id}`, {auxiliarId},
                {headers: {accessToken: localStorage.getItem("accessToken"),}})
                .then((response) => {

                    if(response.data.error) {
                        console.log(data.error);
                    } else {
                        navigate(`/personaDependiente/${id}`)
                    }
                })

        }
    }

    return(
        <div className="App">
            <h1>Completar registro</h1>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={editRegistro}
                //validationSchema={validationSchema}
            >
                <Form className="formContainer">

                    <label>Desayuno:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="desayuno"
                    />

                    <label>Almuerzo:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="almuerzo"
                    />

                    <label>Merienda:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="merienda"
                    />

                    <label>Cena:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="cena"
                    />

                    <label>Pasos Diarios:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="pasosDiarios"
                        placeholder="(Ej. 2000)"
                    />

                    <label>Actividad F??sica:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="actividadFisica"
                        placeholder="(Ej. Andar, ejercio de fuerza...)"
                    />

                    <label>Horas de sue??o:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="horasSueno"
                        placeholder="(Ej. 7.5)"
                    />

                    <label>Tiempo al aire libre:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="tiempoAireLibre"
                        placeholder="(Ej. 30 minutos...)"
                    />

                    <label>Relaciones sociales:</label>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="relacionSocial"
                    />

                    <button type="submit">Guardar registro</button>

                </Form>
            </Formik>
        </div>
    )
}

export default EditRegistros;
