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
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.11 * sin(mf + 3.0) + ph), cos(t * 1.11 * cos(mf + 3.0) + ph));
        ms += 0.026 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.05 - t * 4.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.25; p = rot2(0.31) * p; }
	p *= 2.25;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.54);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.63 + time * 0.13, vec3(0.59, 0.47, 0.43), vec3(0.32, 0.33, 0.35), vec3(1.11, 1.14, 0.77), vec3(0.70, 0.79, 0.37));
	col = fract(col * 2.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
