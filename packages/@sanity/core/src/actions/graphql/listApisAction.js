module.exports = async function listApisAction(args, context) {
  const {apiClient, output, chalk} = context

  const client = apiClient({
    requireUser: true,
    requireProject: true
  })

  let endpoints
  try {
    endpoints = await client.request({
      url: `/apis/graphql`,
      method: 'GET'
    })
  } catch (err) {
    throw err
  }

  if (endpoints && endpoints.length > 0) {
    output.print('Here are the GraphQL endpoints deployed for this project:')
    endpoints.forEach((endpoint, index) => {
      output.print(`${index + 1}.  ${chalk.bold('Dataset:')}     ${endpoint.dataset}`)
      output.print(`    ${chalk.bold('Tag:')}         ${endpoint.tag}`)
      output.print(`    ${chalk.bold('Generation:')}  ${endpoint.generation}`)
      output.print(`    ${chalk.bold('Playground:')}  ${endpoint.playgroundEnabled}\n`)
    })
  } else {
    output.print("This project doesn't have any GraphQL endpoints deployed.")
  }
}
