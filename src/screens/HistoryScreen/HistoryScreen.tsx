import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/theme.styles';
import { styles } from './HistoryScreen.styles';
import { useHistory } from './useHistory';
import { getTodayArg, parseArgDate } from '../../utils/date.utils';

export const HistoryScreen = () => {
    const {
        filterName, setFilterName,
        filterAmount, setFilterAmount,
        filterDate, setFilterDate,
        filteredTransfers,
        isTotalEmpty,
        hasActiveFilters,
        clearFilters
    } = useHistory();

    const todayObj = parseArgDate(getTodayArg()).getTime();

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
                    placeholder="Destinatario"
                    value={filterName}
                    onChangeText={setFilterName}
                    editable={!isTotalEmpty}
                />
                <TextInput
                    style={[globalStyles.input, styles.inputSmall, isTotalEmpty ? styles.disabledInput : null]}
                    placeholder="Monto"
                    keyboardType="decimal-pad"
                    value={filterAmount}
                    onChangeText={setFilterAmount}
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
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No hay transferencias para mostrar.
                    </Text>
                }
                renderItem={({ item }) => {
                    // Convertimos la fecha de la transacción a timestamp
                    const itemDateObj = parseArgDate(item.date).getTime();
                    const isScheduled = itemDateObj > todayObj;

                    return (
                        <View style={[styles.itemCard, isScheduled ? styles.itemCardScheduled : null]}>
                            <View>
                                <Text style={styles.recipient}>{item.recipient}</Text>
                                <Text style={styles.date}>{item.date}</Text>

                                {/* Mostramos una insignia si la transferencia está programada */}
                                {isScheduled ? (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>Programada</Text>
                                    </View>
                                ) : null}
                            </View>
                            <Text style={styles.amount}>-${item.amount.toFixed(2)}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};