namespace $.$$ {

	export class $bog_wikilive_page extends $.$bog_wikilive_page {

		doc() {
			return this.store().doc_by_link( this.page_link() )
		}

		@ $mol_mem
		page_title( next?: string ) {
			const doc = this.doc()
			if( next !== undefined ) {
				doc.Title( 'auto' )!.val( next )
			}
			return doc.title() || 'Без названия'
		}

		@ $mol_mem
		content( next?: string ) {
			const doc = this.doc()
			if( next !== undefined ) {
				doc.Content( 'auto' )!.text( next )
			}
			return doc.Content()?.text() ?? ''
		}

		@ $mol_mem
		body_content() {
			if( this.editing() ) return [ this.Editor() ]
			return [ this.View() ]
		}

		@ $mol_mem
		breadcrumb_chain(): string[] {
			const chain: string[] = []
			let current_link = this.page_link()

			for( let i = 0; i < 20; i++ ) {
				const doc = this.store().doc_by_link( current_link )
				const parent_link = doc.Parent()?.val()
				if( !parent_link ) break
				chain.unshift( parent_link.str )
				current_link = parent_link.str
			}

			return chain
		}

		@ $mol_mem
		breadcrumb_ids() {
			return this.breadcrumb_chain().map( ( _, i ) => i )
		}

		breadcrumb_title( id: number ) {
			const link_str = this.breadcrumb_chain()[ id ]
			if( !link_str ) return ''
			return this.store().doc_by_link( link_str ).title() || 'Без названия'
		}

		breadcrumb_uri( id: number ) {
			const link_str = this.breadcrumb_chain()[ id ]
			return link_str ? '#!page=' + encodeURIComponent( link_str ) : ''
		}

		@ $mol_action
		child_add( next?: any ) {
			if( next === undefined ) return null
			const link_str = this.store().page_create( 'Новая страница', this.page_link() )
			return null
		}

		@ $mol_action
		page_delete( next?: any ) {
			if( next === undefined ) return null
			this.store().page_delete( this.page_link() )
			return null
		}

	}

}
