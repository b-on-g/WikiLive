namespace $ {

	$mol_style_define( $bog_wikilive_page, {

		flex: {
			grow: 1,
		},

		Title_edit: {
			font: {
				size: '1.5rem',
				weight: 600,
			},
		},

		Editors: {
			gap: '-.25rem',
		},

		Editor: {
			flex: {
				grow: 1,
			},
			minHeight: '20rem',
		},

		View: {
			flex: {
				grow: 1,
			},
		},

		History_header: {
			padding: {
				top: '1rem',
				bottom: '.5rem',
				left: '1rem',
				right: '1rem',
			},
			justify: {
				content: 'space-between',
			},
		},

		History_title: {
			font: {
				size: '1.1rem',
				weight: 600,
			},
		},

		History_entry: {
			padding: {
				top: '.5rem',
				bottom: '.5rem',
				left: '1rem',
				right: '1rem',
			},
			gap: '.75rem',
		},

		History_entry_info: {
			flex: {
				direction: 'column',
				grow: 1,
			},
			gap: '.25rem',
			font: {
				size: '.85rem',
			},
			opacity: 0.7,
		},

	} )

}
