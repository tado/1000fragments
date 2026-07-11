uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
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
    vec2 cq = p * 5.30 + vec2(t * 2.16, -t * 2.16) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.85 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.59); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	p = fract(p * 1.63) - 0.5;
	p = rot2(length(p) * 3.09 + time * 0.90) * p;
	{ p = vec2(atan(p.y, p.x) * 2.97, length(p) * 4.21 - time * 0.50); }
	p = abs(p) - 0.47;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.56);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.45 + time * 0.07, vec3(0.45, 0.49, 0.46), vec3(0.33, 0.48, 0.45), vec3(1.38, 1.00, 0.86), vec3(0.63, 0.71, 0.21));
	col = fract(col * 2.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
