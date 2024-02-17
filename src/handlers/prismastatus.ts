export const PrismaError = {
  P1000:
    'Authentication failed against database server at {database_host}, the provided database credentials for {database_user} are not valid. Please make sure to provide valid database credentials for the database server at {database_host}.',
  P1001:
    "Can't reach database server at {database_host}:{database_port} Please make sure your database server is running at {database_host}:{database_port}.",
  P1002:
    'The database server at {database_host}:{database_port} was reached but timed out. Please try again. Please make sure your database server is running at {database_host}:{database_port}.',
  P1003: 'Database {database_file_name} does not exist at {database_file_path}',
  P1004:
    'Database {database_name}.{database_schema_name} does not exist on the database server at {database_host}:{database_port}.',
  P1005:
    'Database {database_name} does not exist on the database server at {database_host}:{database_port}.',
  P1008: 'Operations timed out after {time}',
  P1009:
    'Database {database_name} already exists on the database server at {database_host}:{database_port}',
  P1010:
    'User {database_user} was denied access on the database {database_name}',
  P1011: 'Error opening a TLS connection: {message}',
  P1012:
    'Note: If you get error code P1012 after you upgrade Prisma to version 4.0.0 or later, see the version 4.0.0 upgrade guide. A schema that was valid before version 4.0.0 might be invalid in version 4.0.0 and later. The upgrade guide explains how to update your schema to make it valid.',
  P1013: '{full_error}',
  P1014: 'The underlying {kind} for model {model} does not exist.',
  P1015:
    'Your Prisma schema is using features that are not supported for the version of the database. Database version: {database_version} Errors: {errors}',
  P1016:
    'Your raw query had an incorrect number of parameters. Expected: {expected}, actual: {actual}.',
  P1017: 'Server has closed the connection.',
  P2000:
    "The provided value for the column is too long for the column's type. Column: {column_name}",
  P2001:
    'The record searched for in the where condition ({model_name}.{argument_name} : {argument_value}) does not exist',
  P2002: 'Unique constraint failed on the {constraint}',
  P2003: 'Foreign key constraint failed on the field: {field_name}',
  P2004: 'A constraint failed on the database: {database_error}',
  P2005:
    "The value {field_value} stored in the database for the field {field_name} is invalid for the field's type",
  P2006:
    'The provided value {field_value} for {model_name} field {field_name} is not valid',
  P2007: 'Data validation error {database_error}',
  P2008: 'Failed to parse the query {query_parsing_error} at {query_position}',
  P2009:
    'Failed to validate the query: {query_validation_error} at {query_position}',
  P2010: 'Raw query failed. Code: {code}. Message: {message}',
  P2011: 'Null constraint violation on the {constraint}',
  P2012: 'Missing a required value at {path}',
  P2013:
    'Missing the required argument {argument_name} for field {field_name} on {object_name}.',
  P2014:
    "The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models.",
  P2015: 'A related record could not be found. {details}',
  P2016: 'Query interpretation error. {details}',
  P2017:
    'The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected.',
  P2018: 'The required connected records were not found. {details}',
  P2019: 'Input error. {details}',
  P2020: 'Value out of range for the type. {details}',
  P2021: 'The table {table} does not exist in the current database.',
  P2022: 'The column {column} does not exist in the current database.',
  P2023: 'Inconsistent column data: {message}',
  P2024:
    'Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit})',
  P2025:
    'An operation failed because it depends on one or more records that were required but not found. {cause}',
  P2026:
    "The current database provider doesn't support a feature that the query used: {feature}",
  P2027:
    'Multiple errors occurred on the database during query execution: {errors}',
  P2028: 'Transaction API error: {error}',
  P2030:
    'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema',
  P2031:
    'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set',
  P2033:
    "A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers",
  P2034:
    'Transaction failed due to a write conflict or a deadlock. Please retry your transaction',
  P3000: 'Failed to create database: {database_error}',
  P3001:
    'Migration possible with destructive changes and possible data loss: {migration_engine_destructive_details}',
  P3002: 'The attempted migration was rolled back: {database_error}',
  P3003:
    'The format of migrations changed, the saved migrations are no longer valid. To solve this problem, please follow the steps at: https://pris.ly/d/migrate',
  P3004:
    'The {database_name} database is a system database, it should not be altered with prisma migrate. Please connect to another database.',
  P3005:
    'The database schema is not empty. Read more about how to baseline an existing production database: https://pris.ly/d/migrate-baseline',
  P3006:
    'Migration {migration_name} failed to apply cleanly to the shadow database. {error_code}Error: {inner_error}',
  P3007:
    'Some of the requested preview features are not yet allowed in schema engine. Please remove them from your data model before using migrations. (blocked: {list_of_blocked_features})',
  P3008:
    'The migration {migration_name} is already recorded as applied in the database.',
  P3009:
    'migrate found failed migrations in the target database, new migrations will not be applied. Read more about how to resolve',
};
