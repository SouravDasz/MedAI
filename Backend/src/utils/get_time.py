from datetime import datetime, UTC


def current_time():
    return datetime.now(UTC)


def ensure_utc_datetime(value: datetime | None) -> datetime | None:
    if value is None:
        return None

    if value.tzinfo is None:
        return value.replace(tzinfo=UTC)

    return value.astimezone(UTC)