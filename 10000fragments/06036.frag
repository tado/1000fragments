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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.58 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.36); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.89 + t * 1.34 + ph) + sin(p.y * 5.28 - t * 1.34 + ph)
        + sin((p.x + p.y) * 6.74 + t * 1.34 + ph) + sin(length(p) * 6.85 - t * 1.34 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	p = fract(p * 1.39) - 0.5;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 2.19 * p.y + time * 0.94); p.y += 0.26 / wf * cos(wf * 2.32 * p.x + time * 1.78); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.84);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.54 + time * 0.02, vec3(0.58, 0.56, 0.52), vec3(0.49, 0.44, 0.43), vec3(1.03, 1.34, 0.78), vec3(0.79, 0.58, 0.21));
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
