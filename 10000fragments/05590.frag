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
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.25 * cos(sa * 7 + t * 0.43 + ph);
    v = sin((sr - petal) * 18.47);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.31 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.43); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.97, 0.92) * sin(length(p) * 4.88 - time * 1.93) * 0.13;
	p *= 1.83;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 1.79 * p.y + time * 1.73); p.y += 0.32 / wf * cos(wf * 1.52 * p.x + time * 1.10); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.22 + time * 0.05, vec3(0.59, 0.46, 0.41), vec3(0.46, 0.50, 0.42), vec3(0.82, 1.14, 1.23), vec3(0.28, 0.06, 0.79));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
