uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.28 + sin(p.y * 1.26 + t * 4.21) * 3.20 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.35) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 1.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -1.27 + time * 0.59) * p;
	p += vec2(0.02, 0.16) * sin(length(p) * 2.35 - time * 1.70) * 0.29;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.49; p = rot2(0.32) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.48 + time * 0.05, vec3(0.59, 0.47, 0.59), vec3(0.42, 0.48, 0.44), vec3(0.74, 1.07, 0.70), vec3(0.79, 0.09, 0.38));
	col = mod(col * 2.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
