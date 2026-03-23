namespace $ {

	/** Живая таблица — pawn в land страницы. */
	export class $bog_wikilive_table extends $giper_baza_entity.with({
		Columns: $giper_baza_list_str,
		Row_ids: $giper_baza_list_str,
		Cells: $giper_baza_dict,
	}) {

		cell_val( row_id: string, col: string, next?: string ): string {
			if( next !== undefined ) {
				this.Cells( 'auto' )!.dive( row_id + ':' + col, $giper_baza_atom_text, 'auto' )!.val( next )
			}
			return this.Cells()?.dive( row_id + ':' + col, $giper_baza_atom_text )?.val() ?? ''
		}

		@ $mol_action
		row_add() {
			const id = String( Date.now() )
			this.Row_ids( 'auto' )!.add( id )
			return id
		}

		@ $mol_action
		row_remove( row_id: string ) {
			this.Row_ids()?.cut( row_id )
		}

		@ $mol_action
		col_add( name: string ) {
			this.Columns( 'auto' )!.add( name )
		}

		@ $mol_action
		col_remove( name: string ) {
			this.Columns()?.cut( name )
		}

	}

	/** Вики-документ — entity в отдельном Land. */
	export class $bog_wikilive_doc extends $giper_baza_entity.with({
		Content: $giper_baza_text,
		Parent: $giper_baza_atom_link,
		Children: $giper_baza_list_link,
		Tables: $giper_baza_list_link,
	}) {

		content_text( next?: string ): string {
			const content = this.Content()
			if( !content ) return ''
			if( next !== undefined ) content.text( next )
			return content.text()
		}

		table_add(): $bog_wikilive_table {
			const land = this.land()
			const table = land.Pawn( $bog_wikilive_table ).Head( land.self_make() )
			table.Title( 'auto' )!.val( 'Таблица' )
			table.Columns( 'auto' )!.add( 'A' )
			table.Columns( 'auto' )!.add( 'B' )
			table.Columns( 'auto' )!.add( 'C' )
			const row_id = table.row_add()
			this.Tables( 'auto' )!.add( table.link() )
			return table
		}

		table_list(): $bog_wikilive_table[] {
			const links = this.Tables()?.items() ?? []
			return links
				.filter( ( link ): link is $giper_baza_link => link !== null )
				.map( link => this.land().Pawn( $bog_wikilive_table ).Head( link ) )
		}

	}

	/** Профиль пользователя — живёт в home land. */
	export class $bog_wikilive_profile extends $giper_baza_entity.with({
		Name: $giper_baza_atom_text,
		Favorites: $giper_baza_list_link,
		Recent: $giper_baza_list_link,
		Pages_created: $giper_baza_atom_real,
		Pages_edited: $giper_baza_atom_real,
	}) {}

	/** Реестр страниц в home land. */
	export class $bog_wikilive_registry extends $giper_baza_entity.with({
		Pages: $giper_baza_list_link,
	}) {}

	/** Хранилище вики — glob, registry, CRUD. */
	export class $bog_wikilive_store extends $mol_object {

		glob() {
			return this.$.$giper_baza_glob
		}

		home_land() {
			return this.glob().home().land()
		}

		registry() {
			return this.home_land().Data( $bog_wikilive_registry ) as $bog_wikilive_registry
		}

		profile() {
			return this.home_land().Data( $bog_wikilive_profile ) as $bog_wikilive_profile
		}

		player_id(): string {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		@ $mol_mem
		favorite_link_strs(): string[] {
			const items = this.profile().Favorites()?.items() ?? []
			return items.filter( ( link ): link is $giper_baza_link => link !== null ).map( link => link.str )
		}

		@ $mol_mem
		recent_link_strs(): string[] {
			const items = this.profile().Recent()?.items() ?? []
			return items.filter( ( link ): link is $giper_baza_link => link !== null ).map( link => link.str )
		}

		@ $mol_action
		favorite_toggle( link_str: string ) {
			const link = new $giper_baza_link( link_str )
			const favs = this.profile().Favorites( 'auto' )!
			if( favs.has( link ) ) {
				favs.cut( link )
			} else {
				favs.add( link )
			}
		}

		is_favorite( link_str: string ): boolean {
			return this.favorite_link_strs().includes( link_str )
		}

		@ $mol_action
		recent_add( link_str: string ) {
			const link = new $giper_baza_link( link_str )
			const recent = this.profile().Recent( 'auto' )!
			recent.cut( link )
			recent.add( link )
		}

		@ $mol_mem
		search_results(): string[] {
			return this.page_link_strs()
		}

		search( query: string ): string[] {
			if( !query ) return this.page_link_strs()
			const q = query.toLowerCase()
			return this.page_link_strs().filter( link_str => {
				const doc = this.doc_by_link( link_str )
				const title = doc.title().toLowerCase()
				const content = doc.Content()?.text()?.toLowerCase() ?? ''
				return title.includes( q ) || content.includes( q )
			} )
		}

		@ $mol_mem
		page_links(): readonly $giper_baza_link[] {
			const items = this.registry().Pages()?.items() ?? []
			return items.filter( ( link ): link is $giper_baza_link => link !== null )
		}

		doc_by_link( link_str: string ): $bog_wikilive_doc {
			const land = this.glob().Land( new $giper_baza_link( link_str ) )
			return land.Data( $bog_wikilive_doc ) as $bog_wikilive_doc
		}

		@ $mol_mem
		page_link_strs(): string[] {
			return this.page_links().map( link => link.str )
		}

		@ $mol_mem
		root_link_strs(): string[] {
			return this.page_link_strs().filter( link_str => {
				const doc = this.doc_by_link( link_str )
				return !doc.Parent()?.val()
			} )
		}

		child_link_strs( parent_link_str: string ): string[] {
			const doc = this.doc_by_link( parent_link_str )
			const children = doc.Children()?.items() ?? []
			return children.filter( ( link ): link is $giper_baza_link => link !== null ).map( link => link.str )
		}

		@ $mol_action
		page_create( title: string, parent_link_str?: string ): string {

			const land = this.glob().land_grab( [
				[ null, $giper_baza_rank_read ],
			] )

			const doc = land.Data( $bog_wikilive_doc ) as $bog_wikilive_doc
			doc.Title( 'auto' )!.val( title )
			doc.Content( 'auto' )!.text( '' )

			const land_link = land.link()

			if( parent_link_str ) {
				doc.Parent( 'auto' )!.val( new $giper_baza_link( parent_link_str ) )
				const parent_doc = this.doc_by_link( parent_link_str )
				parent_doc.Children( 'auto' )!.add( land_link )
			}

			this.registry().Pages( 'auto' )!.add( land_link )

			return land_link.str
		}

		@ $mol_action
		page_delete( link_str: string ) {

			const doc = this.doc_by_link( link_str )
			const land_link = new $giper_baza_link( link_str )

			const parent_link = doc.Parent()?.val()
			if( parent_link ) {
				const parent_doc = this.doc_by_link( parent_link.str )
				parent_doc.Children()?.cut( land_link )
			}

			this.registry().Pages()?.cut( land_link )

		}

	}

}
