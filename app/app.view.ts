namespace $.$$ {

	export class $bog_wikilive_app extends $.$bog_wikilive_app {

		@ $mol_mem
		size_watcher() {
			const node = this.dom_node()
			const observer = new ResizeObserver( entries => {
				const width = entries[0]?.contentRect.width ?? 0
				if( width <= 0 ) return
				if( width < 500 ) {
					this.sidebar_mode( 'hidden' )
				} else if( width < 900 ) {
					this.sidebar_mode( 'rail' )
				} else {
					this.sidebar_mode( 'dock' )
				}
			} )
			observer.observe( node )
			return { destructor: () => observer.disconnect() }
		}

		sub() {
			this.size_watcher()
			return super.sub()
		}

		@ $mol_mem
		screen( next?: string ) {
			return $mol_state_arg.value( 'screen', next ) ?? 'home'
		}

		@ $mol_mem
		page_selected( next?: string ) {
			if( next !== undefined && next ) {
				this.screen( 'page' )
			}
			return $mol_state_arg.value( 'page', next ) ?? ''
		}

		@ $mol_mem
		home_active() {
			return this.screen() === 'home' && !this.page_selected()
		}

		@ $mol_mem
		search_active() {
			return this.screen() === 'search'
		}

		@ $mol_mem
		profile_active() {
			return this.screen() === 'profile'
		}

		@ $mol_action
		nav_home( next?: any ) {
			if( next !== undefined ) {
				this.page_selected( '' )
				this.screen( 'home' )
			}
			return null
		}

		@ $mol_action
		nav_search( next?: any ) {
			if( next !== undefined ) {
				this.page_selected( '' )
				this.screen( 'search' )
			}
			return null
		}

		@ $mol_action
		nav_profile( next?: any ) {
			if( next !== undefined ) {
				this.page_selected( '' )
				this.screen( 'profile' )
			}
			return null
		}

		@ $mol_mem
		content_pages() {
			const selected = this.page_selected()
			if( selected ) {
				try { this.store().recent_add( selected ) } catch {}
				return [ this.Page() ]
			}

			switch( this.screen() ) {
				case 'search': return [ this.Search() ]
				case 'profile': return [ this.Profile() ]
				default: return [ this.Welcome() ]
			}
		}

		@ $mol_mem
		pages() {
			return [
				this.Nav(),
				this.Content(),
			]
		}

		@ $mol_action
		add_menu_toggle( next?: any ) {
			if( next === undefined ) return null
			this.add_menu_showed( !this.add_menu_showed() )
			return null
		}

		create_from_template( template: string ) {
			const link_str = this.store().page_create( '', undefined, template )
			this.page_selected( link_str )
			this.add_menu_showed( false )
		}

		@ $mol_action
		page_create_blank( next?: any ) {
			if( next === undefined ) return null
			this.create_from_template( 'blank' )
			return null
		}

		@ $mol_action
		page_create_meeting( next?: any ) {
			if( next === undefined ) return null
			this.create_from_template( 'meeting' )
			return null
		}

		@ $mol_action
		page_create_spec( next?: any ) {
			if( next === undefined ) return null
			this.create_from_template( 'spec' )
			return null
		}

		@ $mol_action
		page_create_guide( next?: any ) {
			if( next === undefined ) return null
			this.create_from_template( 'guide' )
			return null
		}

	}

}
