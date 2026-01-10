function applyFilters(tracks, filters) {
    return tracks.filter(track => {
        // Query filter
        if (filters.query) {
            if (!matchesSearchQuery(track, filters.query)) {
                return false;
            }
        }

        // Difficulty filter
        if (filters.difficulty && track.difficulty?.toLowerCase() !== filters.difficulty?.toLowerCase()) {
            return false;
        }

        // Duration filter
        if (filters.duration) {
            if (!matchesDuration(track, filters.duration)) {
                return false;
            }
        }

        // Distance filter
        if (filters.distance) {
            if (!matchesDistance(track, filters.distance)) {
                return false;
            }
        }

        return true;
    });
}

// Util method - Normalizes text: lowercase + remove accents
function normalize(text = '') {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Matches methods - Check (return true) if the track matches the text search or filter.
function matchesSearchQuery(track, query) {
    const term = normalize(query);

    // Searchable texts
    const title = normalize(track.title);
    const presentation = normalize(track.presentation);
    const departmentName = normalize(track.steps?.[0]?.department?.name);
    const placeName = track.steps
        ?.map(step => normalize(step.place?.name))
        .filter(Boolean)
        .join(' ');

    return (
        title?.includes(term) ||
        presentation?.includes(term) ||
        placeName?.includes(term) ||
        departmentName?.includes(term)
    );
}

function matchesDuration(track, duration) {
    const d = track.duration;

    switch(duration) {
        case "courte": return d <= 60;
        case "moyenne": return d >= 60 && d <= 180;
        case "longue": return d >= 180 && d <= 360;
        case "extralongue": return d >= 360;
        default: return true;
    }
}

function matchesDistance(track, distance) {
    const km = Number(track.distance);

    switch(distance) {
        case "courte": return km <= 5;
        case "moyenne": return km >= 5 && km <= 10;
        case "longue": return km >= 10 && km <= 15;
        case "extralongue": return km >= 15;
        default: return true;
    }
}

export default {
    applyFilters,
}