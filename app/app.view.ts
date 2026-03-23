namespace $.$$ {

	export class $bog_WikiLive_app extends $.$bog_WikiLive_app {

		// TODO: page_selected — текущая выбранная страница, хранить в URL arg
		// @$mol_mem
		// page_selected( next?: string ) {
		//     return $mol_state_arg.value( 'page', next ) ?? ''
		// }

		// TODO: home_active — активна если нет выбранной страницы
		// @$mol_mem
		// home_active() { return !this.page_selected() }

		// TODO: nav_home — сбросить page_selected
		// @$mol_action
		// nav_home() { this.page_selected( '' ) }

		// TODO: content_pages — если page_selected → [Page], иначе → [Welcome]
		// @$mol_mem
		// content_pages() { ... }

		// TODO: pages — sidebar с деревом + контент
		// Вставить Tree() в items sidebar-а после Home_nav
		// @$mol_mem
		// pages() { ... }

		// TODO: page_create_root — создать корневую страницу через store
		// @$mol_action
		// page_create_root() { ... }

	}

}
