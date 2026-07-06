CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  business_name TEXT NOT NULL DEFAULT '',
  business_type TEXT DEFAULT '',
  level INTEGER DEFAULT 1,
  total_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  last_challenge_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_slug TEXT NOT NULL,
  status TEXT DEFAULT 'started' CHECK (status IN ('started', 'completed', 'abandoned')),
  current_step INTEGER DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, challenge_slug)
);

CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_slug TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  shared_count INTEGER DEFAULT 0,
  UNIQUE(user_id, badge_slug)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_badges_user ON user_badges(user_id);

-- Achievements (logros automáticos)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_emoji TEXT DEFAULT '🏆',
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'streak', 'level', 'challenges', 'category')),
  requirement_type TEXT NOT NULL CHECK (requirement_type IN ('challenges_completed', 'streak_days', 'level_reached', 'category_complete', 'points_earned')),
  requirement_value INTEGER NOT NULL,
  requirement_category TEXT,
  xp_reward INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_slug TEXT NOT NULL REFERENCES achievements(slug) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_slug)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements ON user_achievements(user_id);