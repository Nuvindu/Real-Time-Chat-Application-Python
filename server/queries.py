from ariadne import ObjectType, convert_kwargs_to_snake_case

from store import messages,total_data

query = ObjectType("Query")


@query.field("messages")
@convert_kwargs_to_snake_case
async def resolve_messages(obj, info):
    user_messages = messages
    return user_messages

@query.field("allMessages")
@convert_kwargs_to_snake_case
async def resolve_message(obj, infp):
    return total_data

