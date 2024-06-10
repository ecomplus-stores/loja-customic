export default ({ baseDir, sections }) => ({
    name: 'encontre-sua-capa',
    label: 'Encontre sua capa',
    folder: `${baseDir}content/capas`,
    extension: 'json',
    create: true,
    slug: '{{slug}}',
    fields: [
      {
        label: 'Encontre capa',
        name: 'title',
        widget: 'string'
      },       
      {
        label: 'Imagem em Destaque',
        name: 'imagem',
        widget: 'image'
      },
      {
        label: 'Seções',
        name: 'sections',
        required: false,
        hint: 'Por padrão o layout será composto pelo que definir',
        widget: 'list',
        types: [
          {
            label: 'Corpo do post',
            name: 'blog-post',
            widget: 'object',
            fields: [
              {
                label: 'Exibir conteúdo do post',
                name: 'enabled',
                widget: 'boolean',
                default: true
              }
            ]
          }
        ].concat(sections)
      }
    ]
  })
