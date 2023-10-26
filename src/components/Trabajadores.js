import React, { Component } from 'react'
import axios from 'axios';

export default class Trabajadores extends Component {

    state = {
        trabajadores: [],
        state: false

    }

    loadTrabajadoresHospitales() {
        var request = ""
        var url = "https://apiejemplos.azurewebsites.net/api/Trabajadores/TrabajadoresHospitales?";

        for (let i = 0; i < this.props.selectedHospitales.length; i++) {
            // console.log(this.props.selectedHospitales[i]);
            if (i < this.props.selectedHospitales.length-1) {
                request += "idhospital=" + this.props.selectedHospitales[i] + "&";
            } else {
                request += "idhospital=" + this.props.selectedHospitales[i];
            }
        }
        
        axios.get(url + request).then(response =>{
            this.setState({
                trabajadores: response.data,
                status : true
            })
        })


    }

    componentDidMount = () => {
        this.loadTrabajadoresHospitales();
    }

    componentDidUpdate(prevProps) {
        // Compara las propiedades seleccionadas actuales con las anteriores
        if ((prevProps.selectedHospitales) != (this.props.selectedHospitales)) {
            this.loadTrabajadoresHospitales();
        }

        if ((prevProps.incrementar) != (this.props.incrementar)) {
            this.loadTrabajadoresHospitales();
        }
    }


    render() {
        return (
            <div>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>idTrabajador</th>
                            <th>apellido</th>
                            <th>oficio</th>
                            <th>salario</th>
                            <th>Hospital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.trabajadores.map((trabajador) => (
                            <tr key={trabajador.idTrabajador}>
                                <td>{trabajador.idTrabajador}</td>
                                <td>{trabajador.apellido}</td>
                                <td>{trabajador.oficio}</td>
                                <td>{trabajador.salario}</td>
                                <td>{trabajador.idHospital}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        )
    }
}
