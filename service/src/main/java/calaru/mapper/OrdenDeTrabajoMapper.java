package calaru.mapper;

import org.springframework.stereotype.Component;

import calaru.dto.OrdenDeTrabajoDto;
import calaru.model.OrdenDeTrabajo;


@Component
public class OrdenDeTrabajoMapper implements Mapper<OrdenDeTrabajo, OrdenDeTrabajoDto> {

	@Override
	public OrdenDeTrabajoDto entityToDto(OrdenDeTrabajo entity) {
		
		OrdenDeTrabajoDto dto = new OrdenDeTrabajoDto();
		dto.setResponsable(entity.getResponsable());
		dto.setId(entity.getId());
		dto.setFecha(entity.getFecha());
		dto.setEquipo(entity.getEquipo());
		dto.setOrden(entity.getOrden());
		dto.setTarea(entity.getTarea());
		dto.setTiempo(entity.getTiempo());
		dto.setSector(entity.getSector());
		dto.setHerramienta(entity.getHerramienta());
		
		return dto;
	}

	@Override
	public OrdenDeTrabajo dtoToEntity(OrdenDeTrabajoDto dto) {	
		return new OrdenDeTrabajo( dto.getId(),dto.getSector(), dto.getResponsable(), dto.getEquipo(), dto.getFecha(), dto.getOrden(), dto.getTarea(), dto.getTiempo(), dto.getHerramienta());
	}

	
	
}
