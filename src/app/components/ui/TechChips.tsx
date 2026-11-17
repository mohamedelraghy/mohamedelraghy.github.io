import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface TechChipsProps {
    items: string[];
}

export const TechChips = ({ items }: TechChipsProps) => {

    return (
        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: '6px' }}>
            {items.map((item) => (
                <Chip
                    key={item}
                    label={item}
                    variant="outlined"
                    size="small"
                    sx={(theme) => ({
                        height: 'auto',
                        fontSize: '11px',
                        borderRadius: '999px',
                        borderColor: theme.palette.portfolio.line,
                        color: theme.palette.portfolio.chipText,
                        '& .MuiChip-label': {
                            padding: '3px 9px'
                        }
                    })}
                />
            ))}
        </Stack>
    );
};
