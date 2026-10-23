import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/theme.styles';
import { styles } from './HistoryScreen.styles';
import { useHistory } from './useHistory';
import { formatCurrencyARS } from '../../utils/currency.utils';

export const HistoryScreen = () => {
    const {
        filterName, setFilterName,
        filterAmount,
        handleFilterAmountChange,
        filterDate, setFilterDate,
        filteredTransfers,
        isTotalEmpty,
        hasActiveFilters,
        clearFilters
    } = useHistory();

    const todayObj = new Date();
    todayObj.setHours(0, 0, 0, 0);

    return (
        <View style={globalStyles.container}>
            <View style={styles.filtersContainer}>
                <View style={styles.headerFilters}>
                    <Text style={[styles.filterTitle, { marginBottom: 0 }]}>Filtros de Búsqueda</Text>

                    {/* Si no hay registros no se activan los filtros */}
                    {hasActiveFilters && !isTotalEmpty ? (
                        <TouchableOpacity onPress={() => {
                            clearFilters();
                            Keyboard.dismiss();
                        }}>
                            <Text style={styles.clearFiltersText}>Limpiar</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>

                <TextInput
                    style={[globalStyles.input, styles.inputSmall, isTotalEmpty ? styles.disabledInput : null]}
                    placeholder="Destinatario o Doc"
                    value={filterName}
                    onChangeText={setFilterName}
                    editable={!isTotalEmpty}
                />
                <TextInput
                    style={[globalStyles.input, styles.inputSmall, isTotalEmpty ? styles.disabledInput : null]}
                    placeholder="Monto"
                    keyboardType="decimal-pad"
                    value={filterAmount}
                    onChangeText={handleFilterAmountChange}
                    editable={!isTotalEmpty}
                />
                <TextInput
                    style={[globalStyles.input, styles.inputSmall, { marginBottom: 0 }, isTotalEmpty ? styles.disabledInput : null]}
                    placeholder="Fecha (DD/MM/AAAA)"
                    value={filterDate}
                    onChangeText={setFilterDate}
                    editable={!isTotalEmpty}
                />
            </View>

            <FlatList
                data={filteredTransfers}
                keyExtractor={(_, index) => index.toString()} // La API no trae ID, usamos el índice
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No hay transferencias para mostrar.
                    </Text>
                }
                renderItem={({ item }) => {
                    const itemDateObj = new Date(`${item.date}T00:00:00`).getTime();
                    const isScheduled = itemDateObj > todayObj.getTime();

                    const [year, month, day] = item.date.split('-');
                    const displayDate = `${day}/${month}/${year}`;

                    const displayName = item.payeer?.name || 'Desconocido';
                    // Verificamos si la API envió un documento
                    const document = item.payeer?.document;

                    return (
                        <View style={[styles.itemCard, isScheduled ? styles.itemCardScheduled : null]}>
                            <View>
                                <Text style={styles.recipient}>{displayName}</Text>

                                {/* Si viene el documento se muestra*/}
                                {document ? (
                                    <Text style={{ fontSize: 13, color: '#666', marginTop: 2, marginBottom: 2 }}>
                                        Doc: {document}
                                    </Text>
                                ) : null}

                                <Text style={styles.date}>{displayDate}</Text>

                                {/* Mostramos una insignia si la transferencia está programada */}
                                {isScheduled ? (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>Programada</Text>
                                    </View>
                                ) : null}
                            </View>
                            <Text style={styles.amount}>
                                {formatCurrencyARS(item.value, item.currency)}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};