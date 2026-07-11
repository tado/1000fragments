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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.44 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.44); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.41) - 0.5;
	p = abs(p);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.32 * p.y + time * 0.60); p.y += 0.41 / wf * cos(wf * 1.66 * p.x + time * 1.06); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.86 + time * 0.26, vec3(0.47, 0.42, 0.43), vec3(0.46, 0.32, 0.44), vec3(1.04, 1.04, 0.72), vec3(0.58, 0.01, 0.24));
	col = mod(col * 1.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
