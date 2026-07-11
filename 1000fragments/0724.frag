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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.42 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.72); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.41 + sin(p.y * 4.47 + t * 5.67) * 3.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 1.87 * p.y + time * 0.98); p.y += 0.41 / wf * cos(wf * 3.13 * p.x + time * 0.79); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.44);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.60 + time * 0.24, vec3(0.42, 0.59, 0.51), vec3(0.49, 0.39, 0.36), vec3(1.18, 0.99, 0.83), vec3(0.83, 0.48, 0.94));
	col = mod(col * 1.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
