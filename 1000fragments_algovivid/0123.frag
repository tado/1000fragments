uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.25 * pow(abs(cos(ra * 7.0 + t * 0.53)), 1.54);
    v = sin((rr - pet) * 19.31 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.72 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.38); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.07 * p.y + (time * 0.62) * 2.07); p.y += 0.31 / wf * cos(wf * 2.55 * p.x + (time * 0.62) * 2.00); }
	float d1 = field(p, (time * 0.62), 0.0);
	float d2 = field2(p, (time * 0.62), 0.38);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.63 + (time * 0.62) * 0.12, vec3(0.49, 0.48, 0.51), vec3(0.31, 0.26, 0.27), vec3(0.51, 0.89, 0.54), vec3(0.00, 0.32, 0.86));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col = clamp(col, 0.0, 1.0) * vec3(0.925, 0.979, 1.048) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
