namespace $.$$ {

	export class $bog_wikilive_page extends $.$bog_wikilive_page {

		doc() {
			return this.store().doc_by_link( this.page_link() )
		}

		land() {
			return this.store().glob().Land( new $giper_baza_link( this.page_link() ) )
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
		face_entries(): [ string, $giper_baza_face ][] {
			const land = this.land()
			return [ ...land.faces.entries() ]
				.sort( ( a, b ) => b[1].time - a[1].time )
		}

		@ $mol_mem
		editor_peers(): string[] {
			return this.face_entries().map( ( [ peer ] ) => peer )
		}

		@ $mol_mem
		editor_avatars() {
			return this.editor_peers().slice( 0, 5 ).map(
				( _, i ) => this.Editor_avatar( i )
			)
		}

		editor_id( index: number ) {
			return this.editor_peers()[ index ] ?? ''
		}

		@ $mol_mem
		history_content() {
			return [
				this.History_header(),
				this.History_list(),
			]
		}

		@ $mol_mem
		history_items() {
			return this.face_entries().map( ( _, i ) => this.History_entry( i ) )
		}

		history_entry_peer( index: number ) {
			const peer = this.face_entries()[ index ]?.[ 0 ] ?? ''
			return peer.slice( 0, 12 ) + '…'
		}

		history_entry_time( index: number ) {
			const face = this.face_entries()[ index ]?.[ 1 ]
			if( !face || !face.time ) return ''
			const date = new Date( face.time * 1000 )
			return date.toLocaleString( 'ru-RU' )
		}

		history_entry_changes( index: number ) {
			const face = this.face_entries()[ index ]?.[ 1 ]
			if( !face ) return ''
			return face.summ + ' ед.'
		}

		@ $mol_mem
		is_favorite( next?: boolean ) {
			if( next !== undefined ) {
				this.store().favorite_toggle( this.page_link() )
			}
			return this.store().is_favorite( this.page_link() )
		}

		@ $mol_action
		history_toggle( next?: any ) {
			if( next === undefined ) return null
			this.history_showed( !this.history_showed() )
			return null
		}

		@ $mol_action
		history_close( next?: any ) {
			if( next === undefined ) return null
			this.history_showed( false )
			return null
		}

		@ $mol_mem
		table_views() {
			return this.doc().table_list().map(
				( _, i ) => this.Table_view( i )
			)
		}

		table_entity( index: number ): $bog_wikilive_table {
			return this.doc().table_list()[ index ]
		}

		@ $mol_mem
		body_content() {
			const text_view = this.editing() ? [ this.Editor() ] : [ this.View() ]
			return [ ...text_view, ...this.table_views() ]
		}

		@ $mol_mem
		sub() {
			return [
				...super.sub(),
				this.History(),
			]
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
		table_add( next?: any ) {
			if( next === undefined ) return null
			this.doc().table_add()
			return null
		}

		@ $mol_action
		child_add( next?: any ) {
			if( next === undefined ) return null
			this.store().page_create( 'Новая страница', this.page_link() )
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
