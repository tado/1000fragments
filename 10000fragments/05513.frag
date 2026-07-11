uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.12 + jf * 4.0), cos(t * 0.30 * jf)) * 0.82;
        xs += sin(length(p - im) * 147.80 - t * 7.84 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.03 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.88); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	p *= 1.65;
	{ p = vec2(atan(p.y, p.x) * 2.82, length(p) * 5.52 - time * 0.26); }
	p += vec2(-0.99, -0.84) * sin(length(p) * 2.41 - time * 1.62) * 0.33;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.04 + time * 0.18, vec3(0.51, 0.47, 0.54), vec3(0.36, 0.31, 0.36), vec3(0.79, 0.84, 0.75), vec3(0.17, 0.41, 0.24));
	col = mod(col * 1.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
