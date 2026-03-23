namespace $.$$ {

	export class $bog_wikilive_tree extends $.$bog_wikilive_tree {

		@ $mol_mem
		root_nodes() {
			return this.store().root_link_strs().map(
				( _, index ) => this.Root_node( index )
			)
		}

		root_page_link( index: number ): string {
			return this.store().root_link_strs()[ index ] ?? ''
		}

	}

}
