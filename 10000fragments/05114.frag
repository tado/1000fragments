uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.75 + sin(p.y * 3.45 + t * 1.21) * 1.79 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.59 * sin(mf + 3.0) + ph), cos(t * 0.59 * cos(mf + 3.0) + ph));
        ms += 0.077 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -1.52 + time * 0.93) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.10; p = rot2(2.45) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.08, length(p) * 2.16 - time * 0.46); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = d1 * d2;
	vec3 col = palette(d * 1.11 + time * 0.24, vec3(0.46, 0.47, 0.43), vec3(0.38, 0.38, 0.34), vec3(1.04, 0.78, 1.04), vec3(0.01, 0.27, 0.84));
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
