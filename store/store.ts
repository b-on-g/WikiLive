namespace $ {

	/**
	 * Вики-страница — entity в отдельном Land.
	 *
	 * Title наследуется от $giper_baza_entity.
	 * Content — CRDT-текст ($giper_baza_text) для коллаборативного редактирования.
	 * Parent — ссылка на родительскую страницу (для дерева).
	 * Children — список ссылок на дочерние страницы.
	 */
	export class $bog_WikiLive_page extends $giper_baza_entity.with({
		Content: $giper_baza_text,
		Parent: $giper_baza_atom_link,
		Children: $giper_baza_list_link,
	}) {

		// TODO: метод для получения markdown-текста из Content
		// content_text( next?: string ): string { ... }

		// TODO: метод для добавления дочерней страницы
		// child_add( child_link: $giper_baza_link ): void { ... }

		// TODO: метод для удаления дочерней страницы
		// child_remove( child_link: $giper_baza_link ): void { ... }

	}

	/**
	 * Реестр всех страниц — живёт в shared Land.
	 * Хранит список ссылок на Land каждой страницы.
	 *
	 * Паттерн: один инстанс на приложение,
	 * registry land создаётся один раз и шарится через .baza файл.
	 */
	export class $bog_WikiLive_store extends $mol_object {

		// TODO: glob — глобальная Giper Baza БД
		// НЕ ставить @$mol_mem! Кэш внутри $giper_baza_glob.
		// glob(): $giper_baza_glob { ... }

		// TODO: registry land — shared land со списком всех страниц
		// НЕ ставить @$mol_mem! Кэш внутри glob.Land().
		// registry_land(): $giper_baza_land { ... }

		// TODO: registry — список ссылок на страницы
		// registry(): $giper_baza_list_link { ... }

		// TODO: page_create — создать новую страницу (новый Land)
		// @$mol_action
		// page_create( title: string, parent?: $giper_baza_link ): $giper_baza_link { ... }

		// TODO: pages — все страницы (массив можно @$mol_mem)
		// @$mol_mem
		// pages(): $bog_WikiLive_page[] { ... }

		// TODO: page_by_link — получить страницу по ссылке на Land
		// page_by_link( link: $giper_baza_link ): $bog_WikiLive_page { ... }

		// TODO: root_pages — страницы без родителя (корни дерева)
		// @$mol_mem
		// root_pages(): $bog_WikiLive_page[] { ... }

	}

}
