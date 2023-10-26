import React, { Component } from 'react';
import axios from 'axios';
import Trabajadores from './Trabajadores';

export default class Hospitales extends Component {
    state = {
        hospitales: [],           // hospitales seleccionados
        allHospitales: [],         // todos los hospitales 
        selectedHospitalIds: [],
        statusactualizarSalario: false // ID de los hospitales seleccionados
    };

    cajaAumento = React.createRef();

    aumentarSalario = (e) => {
        e.preventDefault();
        var aumento = this.cajaAumento.current.value;

        var url = "https://apiejemplos.azurewebsites.net/api/Trabajadores/UpdateSalarioTrabajadoresHospitales";
        var request = "?incremento=" + aumento + "&";

        for (let i = 0; i < this.state.selectedHospitalIds.length; i++) {
            // console.log(this.props.selectedHospitales[i]);
            if (i < this.state.selectedHospitalIds.length - 1) {
                request += "idhospital=" + this.state.selectedHospitalIds[i] + "&";
            } else {
                request += "idhospital=" + this.state.selectedHospitalIds[i];
            }
        }

        console.log(url + request);

        axios.put(url + request).then(response => {
            this.setState({
                statusactualizarSalario: true
            })
        })
    }

    componentDidMount() {
        this.loadHospitales();
    }

    // Cargar todos los hospitales disponibles desde la API
    loadHospitales = () => {
        const url = "https://apiejemplos.azurewebsites.net/api/Hospitales";
        axios.get(url).then((response) => {
            this.setState({
                allHospitales: response.data,
            });
        });
    };

    manejarHospitalSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        this.setState({
            selectedHospitalIds: selectedOptions,
            hospitales: this.state.allHospitales.filter((hospital) =>
                selectedOptions.includes(hospital.idHospital.toString())
            ),
        });
    };

    render() {

        return (


            <div className="container">
                <div className="form-set">
                    <br></br>
                    <h2>Seleccione hospitales:</h2>
                    <hr />

                    <select multiple onChange={this.manejarHospitalSelect} value={this.state.selectedHospitalIds} className="form-select">
                        {this.state.allHospitales.map((hospital) => (
                            <option key={hospital.idHospital} value={hospital.idHospital}>
                                {hospital.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <br></br>
                <label> Introduce el Aumento de Salario </label>
                &nbsp; <input type='text' ref={this.cajaAumento} />
                &nbsp; <button onClick={this.aumentarSalario}> Auementar</button>


                {this.state.hospitales.length > 0 && (
                    <div className="hospital-details">
                        <br></br>
                        <h2>Hospitales Seleccionados:</h2>
                        <table className="table table-white">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Telefono</th>
                                    <th>Camas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.hospitales.map((hospital) => (
                                    <tr key={hospital.idHospital}>
                                        <td>{hospital.nombre}</td>
                                        <td>{hospital.direccion}</td>
                                        <td>{hospital.telefono}</td>
                                        <td>{hospital.camas}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <hr />
                        <Trabajadores selectedHospitales={this.state.selectedHospitalIds} />
                    </div>
                )}
            </div>
        );
    }
}
