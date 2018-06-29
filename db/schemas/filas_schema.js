export function filas(Schema) {
	return new Schema({
		id_estabelecimento: String,
		id_fila: String,
		data_hora_inicio: String,
		data_hora_fim: String,
		tamanho: Number,
		cronologica: {
			  aceita_premium: Boolean,
			  aceita_preferencial: Boolean,
		    entradas:{
				id_usuario: String,
				distancia: String,
			    data_hora_entrada: String,
			    preferencial: Boolean,
			    premium: Boolean,
			    posicao: Number
				}],
		    concluidos:[{
				id_usuario: String,
				distancia: String,
			    data_hora_entrada: String,
			    preferencial: Boolean,
			    premium: Boolean,
			    posicao: Number,
			    data_hora_saida: String,
			    desistencia_ou_atendido: String
				}],
			},
		agendada: {
		    agendamentos:[{
				 id_usuario: String,
			    data_hora_agendada: String,
			    data_hora_criacao: String
				}],
		    agendamentos_concluidos:[{
				  id_usuario: String,
			    data_hora_agendada: String,
			    data_hora_criacao: String,
			    desistencia_ou_atendido: String
				}],
			}
	}, { timestamps	: { updatedAt: 'updated_at', createdAt: 'created_at' } });
}
