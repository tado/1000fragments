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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.28 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.19); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.80, length(p) * 4.98 - time * 0.55); }
	p = rot2(length(p) * -2.88 + time * 0.74) * p;
	p = rot2(p.y * 1.31 + time * 1.01) * p;
	p = rot2(2.53) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.75, 0.91, 0.36) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 1.72 + time * 14.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
