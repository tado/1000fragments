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
    v = 0.25 * (sin(p.x * 13.29 + t * 1.81 + ph) + sin(p.y * 13.75 - t * 1.81 + ph)
        + sin((p.x + p.y) * 9.41 + t * 1.81 + ph) + sin(length(p) * 3.78 - t * 1.81 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 4.27 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.13); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.87;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.78 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.23);
	float d = d1 + d2;
	vec3 col = palette(d * 0.94 + time * 0.27, vec3(0.57, 0.58, 0.53), vec3(0.37, 0.33, 0.48), vec3(1.11, 1.28, 0.93), vec3(0.61, 0.92, 0.01));
	col = mod(col * 2.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
