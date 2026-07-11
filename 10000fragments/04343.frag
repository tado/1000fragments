uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 35.57 - t * 5.36 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 19.24 - t * 5.36 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.80) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 2.74 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.38) - 0.5;
	p = rot2(length(p) * -1.54 + time * 0.94) * p;
	{ p = vec2(atan(p.y, p.x) * 2.48, length(p) * 3.94 - time * 0.77); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.35);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.94 + time * 0.18, vec3(0.41, 0.47, 0.54), vec3(0.43, 0.33, 0.46), vec3(1.39, 0.78, 1.08), vec3(0.11, 0.51, 0.41));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
