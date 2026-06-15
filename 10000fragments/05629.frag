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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.13 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.24); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.80 + jf * 4.0), cos(t * 0.36 * jf)) * 0.43;
        xs += sin(length(p - im) * 72.97 - t * 7.76 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.69) - 0.5;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.06 * p.y + time * 0.67); p.y += 0.42 / wf * cos(wf * 3.54 * p.x + time * 0.84); }
	p = rot2(length(p) * 3.44 + time * 0.62) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.61);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.16 + time * 0.23, vec3(0.47, 0.45, 0.49), vec3(0.40, 0.47, 0.34), vec3(1.28, 0.75, 0.90), vec3(0.61, 0.96, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
