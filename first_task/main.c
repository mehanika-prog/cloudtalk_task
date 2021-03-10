#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>


#define VALIDATION


void error(char *message, int status) {

	printf("%s\n", message);

	exit(status);

}

void validateN(long field_size) {

	if (field_size < 3 || field_size > 10000) {
		
		error("\nN must be between 3 and 10_000, inclusive!\n", 1);

	}

}

void validateQ(long queries_count) {

	if (queries_count < 1 || queries_count > 1000000) {
		
		error("\nQ must be between 1 and 10_000_000, inclusive!\n", 1);

	}

}

short** getField(short field_size) {

	short** field = malloc(sizeof(short*) * field_size);

	for (short i = 0; i < field_size; i++) {

		field[i] = malloc(sizeof(short) * field_size);

	}

	for (short i = 0; i < field_size; i++) {

		for (short j = 0; j < field_size; j++) {

			fscanf(stdin, "%hu", &field[i][j]);

		}

	}

	return field;

}

short** getQueries(int queries_count) {

	short** queries = malloc(sizeof(short*) * queries_count);

	for (short i = 0; i < queries_count; i++) {

		queries[i] = malloc(sizeof(short) * 4);

	}

	for (int i = 0; i < queries_count; i++) {

		for (short j = 0; j < 4; j++) {

			fscanf(stdin, "%hu", &queries[i][j]);

		}

	}

	return queries;

}

void showField(short** field, short field_size) {

	for (short i = 0; i < field_size; i++) {

		for (short j = 0; j < field_size; j++) {

			printf("%hu ", field[i][j]);

		} printf("\n");

	}

}

void showQueries(short** queries, int queries_count) {

	for (int i = 0; i < queries_count; i++) {

		for (short j = 0; j < 4; j++) {

			printf("%hu ", queries[i][j]);

		} printf("\n");

	}

}

void validateABCD(short** queries, short field_size, int queries_count) {

	for (int i = 0; i < queries_count; i++) {

		for (short j = 0; j < 4; j++) {

			if (queries[i][j] > field_size) {

				error("\na, b, c, d must be less than or equal to N\n", 1);

			}

		}

		if (queries[i][0] > queries[i][2]) {

			error("\na must be less than or equal to c\n", 1);

		}

		if (queries[i][1] > queries[i][3]) {

			error("\nb must be less than or equal to d\n", 1);

		}

	}

}

long long calculateYeld(short** field, short* querie) {

	long long yeld = 0;

	// Some magic! xD

	return 0;

}

void calculateAndShow(short** field, short** queries, short field_size, int queries_count) {

	long long yield;

	for (int i = 0; i < queries_count; i++) {

		yield = calculateYeld(field, *(queries + i));

		printf("%lld\n", yield);

	}

}


int main(void) {

	long field_size;
	long queries_count;
	short** field;
	short** queries;

	int scanf_result = scanf("%ld%ld", &field_size, &queries_count);

	#ifdef VALIDATION
	validateN(field_size);
	validateQ(queries_count);
	#endif

	field = getField((short)field_size);
	queries = getQueries((int)queries_count);

	#ifdef VALIDATION
	validateABCD(queries, (short) field_size, (int) queries_count);
	#endif

	calculateAndShow(field, queries, (short) field_size, (int) queries_count);

	return 0;

}