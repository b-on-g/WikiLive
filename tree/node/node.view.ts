namespace $.$$ {

	export class $bog_wikilive_tree_node extends $.$bog_wikilive_tree_node {

		doc() {
			return this.store().doc_by_link( this.page_link() )
		}

		title() {
			return this.doc().title() || 'Без названия'
		}

		active() {
			return this.page_link() === this.page_selected()
		}

		@ $mol_action
		select( next?: any ) {
			if( next !== undefined ) this.page_selected( this.page_link() )
			return null
		}

		child_level() {
			return this.level() + 1
		}

		@ $mol_mem
		child_link_strs() {
			return this.store().child_link_strs( this.page_link() )
		}

		@ $mol_mem
		child_nodes() {
			return this.child_link_strs().map(
				( _, index ) => this.Child_node( index )
			)
		}

		child_page_link( index: number ): string {
			return this.child_link_strs()[ index ] ?? ''
		}

		sub() {
			const has_children = this.child_link_strs().length > 0
			if( !has_children ) return [ this.Drop() ]
			if( !this.expanded() ) return [ this.Drop() ]
			return [ this.Drop(), this.Children() ]
		}

		@ $mol_action
		drop_receive( transfer?: DataTransfer ) {
			if( !transfer ) return null
			const dragged_link = transfer.getData( 'text/plain' )
			if( !dragged_link || dragged_link === this.page_link() ) return null

			this.store().page_move( dragged_link, this.page_link() )
			return null
		}

	}

}
