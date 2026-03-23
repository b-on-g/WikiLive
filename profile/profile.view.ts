namespace $.$$ {

	export class $bog_wikilive_profile_page extends $.$bog_wikilive_profile_page {

		@ $mol_mem
		player_id() {
			return this.store().player_id()
		}

		@ $mol_mem
		profile_name( next?: string ) {
			const profile = this.store().profile()
			if( next !== undefined ) {
				profile.Name( 'auto' )!.val( next )
			}
			return profile.Name()?.val() ?? 'Аноним'
		}

		@ $mol_mem
		stat_created() {
			return String( this.store().profile().Pages_created()?.val() ?? 0 )
		}

		@ $mol_mem
		stat_edited() {
			return String( this.store().profile().Pages_edited()?.val() ?? 0 )
		}

		@ $mol_mem
		stat_favorites() {
			return String( this.store().favorite_link_strs().length )
		}

		@ $mol_mem
		favorite_rows() {
			const links = this.store().favorite_link_strs()
			if( !links.length ) return [ this.Favorites_empty() ]
			return links.map( ( _, i ) => this.Fav_row( i ) )
		}

		fav_row_title( index: number ) {
			const link_str = this.store().favorite_link_strs()[ index ]
			if( !link_str ) return ''
			return this.store().doc_by_link( link_str ).title() || 'Без названия'
		}

		@ $mol_action
		fav_row_click( index: number, next?: any ) {
			if( next === undefined ) return null
			const link_str = this.store().favorite_link_strs()[ index ]
			if( link_str ) this.page_selected( link_str )
			return null
		}

		@ $mol_mem
		recent_rows() {
			const links = this.store().recent_link_strs()
			if( !links.length ) return [ this.Recent_empty() ]
			return links.slice( 0, 20 ).map( ( _, i ) => this.Recent_row( i ) )
		}

		recent_row_title( index: number ) {
			const link_str = this.store().recent_link_strs()[ index ]
			if( !link_str ) return ''
			return this.store().doc_by_link( link_str ).title() || 'Без названия'
		}

		@ $mol_action
		recent_row_click( index: number, next?: any ) {
			if( next === undefined ) return null
			const link_str = this.store().recent_link_strs()[ index ]
			if( link_str ) this.page_selected( link_str )
			return null
		}

	}

}
