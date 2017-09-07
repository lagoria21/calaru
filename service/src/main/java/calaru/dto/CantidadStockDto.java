package calaru.dto;

public class CantidadStockDto {

	private long id;
	private String descripcion;
	private int cantidad;
	private int codigo;
	
	
	
	public CantidadStockDto(long id,String descripcion, int cantidad, int codigo) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.cantidad = cantidad;
		this.codigo = codigo;
	}
	
	public CantidadStockDto() {
		super();
	}
	
	public String getDescripcion() {
		return descripcion;
	}
	
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public int getCantidad() {
		return cantidad;
	}
	
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}
	
	
	
}
