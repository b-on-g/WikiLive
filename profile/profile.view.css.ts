namespace $ {

	$mol_style_define( $bog_wikilive_profile_page, {

		Card: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			gap: '1rem',
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			maxWidth: '480px',
		},

		Avatar: {
			flex: {
				shrink: 0,
			},
		},

		Name_edit: {
			font: {
				size: '1.3rem',
				weight: 600,
			},
		},

		Stats: {
			flex: {
				direction: 'column',
			},
			gap: '.5rem',
			padding: {
				top: '1rem',
				bottom: '1rem',
				left: '1rem',
				right: '1rem',
			},
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: '.5rem',
			},
		},

		Favorites_section: {
			flex: {
				direction: 'column',
			},
			padding: {
				top: '1rem',
				bottom: '1rem',
				left: '1.5rem',
				right: '1.5rem',
			},
		},

		Favorites_title: {
			font: {
				size: '1.1rem',
				weight: 600,
			},
			padding: {
				bottom: '.5rem',
			},
		},

		Recent_section: {
			flex: {
				direction: 'column',
			},
			padding: {
				top: '1rem',
				bottom: '1rem',
				left: '1.5rem',
				right: '1.5rem',
			},
		},

		Recent_title: {
			font: {
				size: '1.1rem',
				weight: 600,
			},
			padding: {
				bottom: '.5rem',
			},
		},

		Favorites_empty: {
			opacity: 0.5,
		},

		Recent_empty: {
			opacity: 0.5,
		},

	} )

}
