namespace $.$$ {

	export class $bog_WikiLive_page extends $.$bog_WikiLive_page {

		// TODO: получить page entity из store по page_link
		// page(): $bog_WikiLive_page_entity { ... }

		// TODO: page_title — двусторонний биндинг к page.Title()?.val()
		// @$mol_mem
		// page_title( next?: string ) { ... }

		// TODO: content — двусторонний биндинг к page.Content()?.text()
		// Это $giper_baza_text — CRDT, автомёрдж
		// @$mol_mem
		// content( next?: string ) { ... }

		// TODO: body_content — если editing() → [Editor], иначе → [View]
		// @$mol_mem
		// body_content() { ... }

		// TODO: breadcrumb_ids — собрать цепочку parent→parent→...→root
		// @$mol_mem
		// breadcrumb_ids() { ... }

		// TODO: breadcrumb_title — title родительской страницы по индексу
		// breadcrumb_title( id: string ) { ... }

		// TODO: breadcrumb_uri — URI для навигации к родителю
		// breadcrumb_uri( id: string ) { ... }

		// TODO: child_add — создать дочернюю страницу через store.page_create()
		// @$mol_action
		// child_add() { ... }

		// TODO: page_delete — удалить страницу
		// @$mol_action
		// page_delete() { ... }

	}

}
