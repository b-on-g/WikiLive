namespace $.$$ {

	export class $bog_wikilive_table_view extends $.$bog_wikilive_table_view {

		@ $mol_mem
		table_title( next?: string ) {
			const t = this.table()
			if( next !== undefined ) {
				t.Title( 'auto' )!.val( next )
			}
			return t.title() || 'Таблица'
		}

		@ $mol_mem
		columns(): string[] {
			const items = this.table().Columns()?.items() ?? []
			return items.filter( ( s ): s is string => s !== null )
		}

		@ $mol_mem
		rows(): string[] {
			const items = this.table().Row_ids()?.items() ?? []
			return items.filter( ( s ): s is string => s !== null )
		}

		col_ids() {
			return this.columns()
		}

		row_ids() {
			return this.rows().map( id => [ id ] )
		}

		@ $mol_mem
		head_cells() {
			return this.columns().map( col => this.Col_head( col ) )
		}

		col_title( col: string ) {
			return col
		}

		cells( row_id: string[] ) {
			return this.columns().map( col => this.Cell( row_id[0] + ':' + col ) )
		}

		@ $mol_mem_key
		cell_val( id: string, next?: string ) {
			const [ row_id, col ] = id.split( ':' )
			return this.table().cell_val( row_id, col, next )
		}

		@ $mol_action
		col_add_click( next?: any ) {
			if( next === undefined ) return null
			const cols = this.columns()
			const next_letter = String.fromCharCode( 65 + cols.length )
			this.table().col_add( next_letter )
			return null
		}

		@ $mol_action
		row_add_click( next?: any ) {
			if( next === undefined ) return null
			this.table().row_add()
			return null
		}

	}

}
