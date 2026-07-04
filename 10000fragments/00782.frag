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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.22 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.50); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.11;
	p += vec2(0.93, 0.69) * sin(length(p) * 2.99 - time * 1.78) * 0.35;
	p = sin(p * 1.53 + time * 1.95) * 0.86;
	p = rot2(p.y * -2.28 + time * 0.93) * p;
	p = fract(p * 2.50) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.13, 0.05, 0.51), vec3(0.89, 0.73, 0.79), d);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
