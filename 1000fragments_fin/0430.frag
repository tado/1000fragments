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
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.79 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.95); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.51 + (time * 0.91) * 0.92) * 0.20;
	float d = 0.5 + 0.5 * field(p, (time * 0.91), 0.0);
	vec2 hq = rot2(0.68) * p * 9.42;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 1.26 + (time * 0.91) * 0.21, vec3(0.46, 0.23, 0.14), vec3(0.44, 0.31, 0.22), vec3(0.99, 1.01, 0.99), vec3(0.00, 0.11, 0.19)) * v;
	col *= 0.85 + 0.17 * sin(gl_FragCoord.y * 1.70 + (time * 0.91) * 16.66);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.967, 1.024, 0.950);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
