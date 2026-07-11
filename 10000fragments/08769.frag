uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.49 * sin(mf + 3.0) + ph), cos(t * 1.49 * cos(mf + 3.0) + ph));
        ms += 0.042 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.97 + sr * 23.79 - t * 2.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	p = rot2(p.y * -2.91 + time * 0.35) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.02 + time * 0.04, vec3(0.52, 0.46, 0.51), vec3(0.49, 0.49, 0.48), vec3(1.34, 0.77, 1.09), vec3(0.03, 0.96, 0.25));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
