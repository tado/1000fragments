uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.09 * sin(mf + 3.0) + ph), cos(t * 1.98 * cos(mf + 3.0) + ph));
        ms += 0.067 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 3.02 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.88); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.66 * p.y + time * 0.86); p.y += 0.44 / wf * cos(wf * 1.51 * p.x + time * 1.66); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.41; p = rot2(1.80) * p; }
	p = rot2(time * -0.79) * p;
	p = rot2(p.y * -1.65 + time * 0.69) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.27 + time * 0.01, vec3(0.42, 0.42, 0.47), vec3(0.34, 0.36, 0.38), vec3(1.08, 0.84, 0.85), vec3(0.27, 0.34, 0.77));
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 2.53 + time * 5.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
