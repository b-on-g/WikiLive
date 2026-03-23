namespace $ {

	/** Вики-документ — entity в отдельном Land. */
	export class $bog_wikilive_doc extends $giper_baza_entity.with({
		Content: $giper_baza_text,
		Parent: $giper_baza_atom_link,
		Children: $giper_baza_list_link,
	}) {

		content_text( next?: string ): string {
			const content = this.Content()
			if( !content ) return ''
			if( next !== undefined ) content.text( next )
			return content.text()
		}

	}

	/** Реестр страниц в home land. */
	export class $bog_wikilive_registry extends $giper_baza_entity.with({
		Pages: $giper_baza_list_link,
	}) {}

	/** Хранилище вики — glob, registry, CRUD. */
	export class $bog_wikilive_store extends $mol_object {

		// Без @$mol_mem — кэш внутри $giper_baza_glob
		glob() {
			return this.$.$giper_baza_glob
		}

		// Без @$mol_mem — кэш внутри glob
		home_land() {
			return this.glob().home().land()
		}

		// Без @$mol_mem — кэш внутри land.Data()
		registry() {
			return this.home_land().Data( $bog_wikilive_registry ) as $bog_wikilive_registry
		}

		@ $mol_mem
		page_links(): readonly $giper_baza_link[] {
			const items = this.registry().Pages()?.items() ?? []
			return items.filter( ( link ): link is $giper_baza_link => link !== null )
		}

		// Получить документ по строке ссылки на land
		doc_by_link( link_str: string ): $bog_wikilive_doc {
			const land = this.glob().Land( new $giper_baza_link( link_str ) )
			return land.Data( $bog_wikilive_doc ) as $bog_wikilive_doc
		}

		// Строки ссылок для всех страниц
		@ $mol_mem
		page_link_strs(): string[] {
			return this.page_links().map( link => link.str )
		}

		// Строки ссылок корневых страниц (без parent)
		@ $mol_mem
		root_link_strs(): string[] {
			return this.page_link_strs().filter( link_str => {
				const doc = this.doc_by_link( link_str )
				return !doc.Parent()?.val()
			} )
		}

		// Строки ссылок дочерних страниц
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

			// Убрать из parent.Children
			const parent_link = doc.Parent()?.val()
			if( parent_link ) {
				const parent_doc = this.doc_by_link( parent_link.str )
				parent_doc.Children()?.cut( land_link )
			}

			// Убрать из registry
			this.registry().Pages()?.cut( land_link )

		}

	}

}
