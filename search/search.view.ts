namespace $.$$ {

	export class $bog_wikilive_search extends $.$bog_wikilive_search {

		@ $mol_mem
		results(): string[] {
			return this.store().search( this.query() )
		}

		@ $mol_mem
		result_rows() {
			const results = this.results()
			if( !results.length ) return [ this.Empty() ]
			return results.map( ( _, i ) => this.Result_row( i ) )
		}

		result_title( index: number ) {
			const link_str = this.results()[ index ]
			if( !link_str ) return ''
			return this.store().doc_by_link( link_str ).title() || 'Без названия'
		}

		@ $mol_action
		result_click( index: number, next?: any ) {
			if( next === undefined ) return null
			const link_str = this.results()[ index ]
			if( link_str ) this.page_selected( link_str )
			return null
		}

	}

}
