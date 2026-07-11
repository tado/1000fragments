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
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.43 * sin(mf + 3.0) + ph), cos(t * 2.19 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.38; p = rot2(2.16) * p; }
	p = rot2(p.y * 2.83 + time * 0.95) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.21, vec3(0.58, 0.58, 0.57), vec3(0.48, 0.48, 0.39), vec3(0.78, 1.14, 1.37), vec3(0.20, 0.47, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
