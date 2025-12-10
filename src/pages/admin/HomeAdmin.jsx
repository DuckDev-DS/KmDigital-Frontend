import React from 'react'

import EntityCrudPanel from '../../components/organisms/EntityCrudPanel.jsx'
//import de todos los datos e inputs necesarios
import { vehiculoData } from '../admin/vehiculos/vehiculoData.jsx'
import { vehiculoInputs } from '../admin/vehiculos/vehiculoInputs.jsx'
import { usuarioInputs } from './usuarios/usuarioInputs.jsx'
import { usuarioData } from '../admin/usuarios/usuarioData.jsx'
import { comunaData } from '../admin/comunas/comunaData.jsx'
import { comunaInputs } from '../admin/comunas/comunaInputs.jsx'
import { marcaData } from '../admin/marcas/marcaData.jsx'
import { marcaInputs } from '../admin/marcas/marcaInputs.jsx'
import { modeloData } from '../admin/modelos/modeloData.jsx'
import { modeloInputs } from '../admin/modelos/modeloInputs.jsx'
import { categoriaData } from '../admin/categorias/categoriaData.jsx'
import { categoriaInputs } from '../admin/categorias/categoriaInputs.jsx'
import { regionData } from '../admin/regiones/regionData.jsx'
import { regionInputs } from '../admin/regiones/regionInputs.jsx'
import { paisOrigenData } from '../admin/paisesOrigen/paisOrigenData.jsx'
import { paisOrigenInputs } from '../admin/paisesOrigen/paisOrigenInputs.jsx'
import { transmisionData } from  '../admin/transmisiones/transmisionData.jsx'
import { transmisionInputs } from  '../admin/transmisiones/transmisionInputs.jsx'
import { tipoCombustibleData } from  '../admin/tiposCombustibles/tipoCombustibleData.jsx'
import { tipoCombustibleInputs } from  '../admin/tiposCombustibles/tipoCombustibleInputs.jsx'
import { sucursalData } from '../admin/sucursales/sucursalData.jsx'
import { sucursalInputs } from '../admin/sucursales/sucursalInputs.jsx'
import { rolUsuarioData } from '../admin/rolesUsuarios/rolUsuarioData.jsx'
import { rolUsuarioInputs } from '../admin/rolesUsuarios/rolUsuarioInputs.jsx'
import { carroceriaData } from '../admin/carrocerias/carroceriaData.jsx'
import { carroceriaInputs } from '../admin/carrocerias/carroceriaInputs.jsx'

//Import de los service con el crud
import VehiculosService from '../../services/VehiculosService.jsx'
import UsuariosService from '../../services/UsuariosService.jsx'
import ComunasService from '../../services/ComunasService.jsx'
import MarcasService from '../../services/MarcasService.jsx'
import ModelosService from '../../services/ModelosService.jsx'
import CategoriaService from '../../services/CategoriaService.jsx'
import RegionesService from '../../services/RegionesService.jsx'
import PaisOrigenService from '../../services/PaisOrigenService.jsx'
import TransmisionService from '../../services/TransmisionService.jsx'
import TipoCombustibleService from '../../services/TipoCombustibleService.jsx'
import SucursalesService from '../../services/SucursalesService.jsx'
import RolUsuarioService from '../../services/RolUsuarioService.jsx'
import CarroceriaService from '../../services/CarroceriaService.jsx'

function HomeAdmin() {
    return (
        <div>
            <div className="container my-5">
                <EntityCrudPanel
                    dataConfig={vehiculoData}
                    inputsConfig={vehiculoInputs}
                    service={VehiculosService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={usuarioData}
                    inputsConfig={usuarioInputs}
                    service={UsuariosService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={comunaData}
                    inputsConfig={comunaInputs}
                    service={ComunasService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={marcaData}
                    inputsConfig={marcaInputs}
                    service={MarcasService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={modeloData}
                    inputsConfig={modeloInputs}
                    service={ModelosService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={categoriaData}
                    inputsConfig={categoriaInputs}
                    service={CategoriaService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={regionData}
                    inputsConfig={regionInputs}
                    service={RegionesService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={paisOrigenData}
                    inputsConfig={paisOrigenInputs}
                    service={PaisOrigenService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={transmisionData}
                    inputsConfig={transmisionInputs}
                    service={TransmisionService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={tipoCombustibleData}
                    inputsConfig={tipoCombustibleInputs}
                    service={TipoCombustibleService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={sucursalData}
                    inputsConfig={sucursalInputs}
                    service={SucursalesService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={rolUsuarioData}
                    inputsConfig={rolUsuarioInputs}
                    service={RolUsuarioService}
                />
            </div>
            <div className='container my-5'>
                <EntityCrudPanel
                    dataConfig={carroceriaData}
                    inputsConfig={carroceriaInputs}
                    service={CarroceriaService}
                />
            </div>
        </div>
    )
}

export default HomeAdmin