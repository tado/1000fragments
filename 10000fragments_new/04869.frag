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

float field(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.63 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.12); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	p = rot2(2.40) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.51; p = rot2(0.49) * p; }
	{ float fr = length(p); p *= 1.0 + 0.54 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.89));
	col = 0.5 + 0.5 * col;
	col *= 0.90 + 0.14 * sin(gl_FragCoord.y * 2.80 + time * 9.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
