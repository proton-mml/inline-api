export function filas(Schema) {
	return new Schema({
		id_estabelecimento: String,
		id_fila: String,
		data_hora_inicio: Date,
		data_hora_fim: Date,
		tamanho: Number,
		cronologica: {
			  aceita_premium: Boolean,
			  aceita_preferencial: Boolean,
		    entradas: [{
				id_cliente: Number,
				distancia: String,
			    data_hora_entrada: Date,
			    preferencial: Boolean,
			    premium: Boolean,
			    posicao: Number
			}],
		    concluidos:[{
				id_cliente: Number,
				distancia: String,
			    data_hora_entrada: Date,
			    preferencial: Boolean,
			    premium: Boolean,
			    posicao: Number,
			    data_hora_saida: Date,
			    desistencia_ou_atendido: String
			}],
		},
		agendada: {
		    agendamentos:[{
				id_cliente: Number,
			    data_hora_agendada: Date,
			    data_hora_criacao: Date
			}],
		    agendamentos_concluidos:[{
				 id_cliente: Number,
			    data_hora_agendada: Date,
			    data_hora_criacao: Date,
			    desistencia_ou_atendido: String
			}],
		}
	}, { timestamps	: { updatedAt: 'updated_at', createdAt: 'created_at' } });
}
