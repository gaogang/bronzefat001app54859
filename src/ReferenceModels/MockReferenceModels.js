export default () => {
    return (
        [
            {
                id: 1,
                target: 'app',
                targetRuntime: 'react',
                action: 'create',
                components: [
                    {
                        name: '###name###',
                        type: 'app',
                        runtime: 'react',
                        isPrivate: false,
                        resource: 'AppServices',
                        display: {
                          mode: 'auto'
                        },
                        devops: {
                          staging: 
                          {
                            enabled: true, 
                            stages: [
                            {
                              name: 'staging',
                              isProd: false
                            },
                            {
                              name: 'production',
                              isProd: true
                            }]
                          }
                        }
                    },
                    {
                        name: '###name###',
                        type: 'Repo',
                        runtime: 'Github',
                        isPrivate: false,
                        resource: 'Github'
                    },
                    {
                        name: '###name###',
                        type: 'cdn',
                        runtime: 'cdn',
                        isPrivate: false,
                        resource: 'cdn'
                    }
                ]
            }
        ]
    );
}