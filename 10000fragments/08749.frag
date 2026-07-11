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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.05 * sin(mf + 3.0) + ph), cos(t * 2.05 * cos(mf + 3.0) + ph));
        ms += 0.096 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.93 * sin(mf + 3.0) + ph), cos(t * 1.93 * cos(mf + 3.0) + ph));
        ms += 0.093 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.34; p = rot2(1.90) * p; }
	p = rot2(p.y * 2.97 + time * 0.16) * p;
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.17 + time * 0.26, vec3(0.41, 0.58, 0.40), vec3(0.35, 0.45, 0.34), vec3(1.34, 1.11, 1.01), vec3(0.67, 0.45, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
