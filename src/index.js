exports.handler = async function(event, context) {
  const date = new Date();
  console.log("EVENT", date, JSON.stringify(event, null, 2))
  return context.logStreamName;
}
