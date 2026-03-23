namespace $.$$ {

	export class $bog_wikilive_app extends $.$bog_wikilive_app {

		@ $mol_mem
		page_selected( next?: string ) {
			return $mol_state_arg.value( 'page', next ) ?? ''
		}

		@ $mol_mem
		home_active() {
			return !this.page_selected()
		}

		@ $mol_action
		nav_home( next?: any ) {
			if( next !== undefined ) this.page_selected( '' )
			return null
		}

		@ $mol_mem
		content_pages() {
			const selected = this.page_selected()
			if( selected ) return [ this.Page() ]
			return [ this.Welcome() ]
		}

		@ $mol_mem
		pages() {
			return [
				this.Nav(),
				this.Content(),
			]
		}

		@ $mol_action
		page_create_root( next?: any ) {
			if( next === undefined ) return null
			const link_str = this.store().page_create( 'Новая страница' )
			this.page_selected( link_str )
			return null
		}

	}

}
