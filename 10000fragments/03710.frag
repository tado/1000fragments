uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.04) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 3.77 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(0.93) * p; }
	p += vec2(-0.12, 0.71) * sin(length(p) * 5.76 - time * 0.61) * 0.27;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.35 + time * 0.27, vec3(0.47, 0.51, 0.56), vec3(0.44, 0.32, 0.42), vec3(1.29, 1.07, 1.02), vec3(0.50, 0.27, 0.35));
	col = mod(col * 2.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
