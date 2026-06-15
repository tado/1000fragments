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
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.79 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.01); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.00 + t * 3.02 + ph) + sin(p.y * 2.98 - t * 3.02 + ph)
        + sin((p.x + p.y) * 4.71 + t * 3.02 + ph) + sin(length(p) * 6.01 - t * 3.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.66;
	p = rot2(time * -1.09) * p;
	p *= 1.56;
	p = rot2(p.y * -3.43 + time * 0.98) * p;
	p = fract(p * 1.76) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.92 + time * 0.24, vec3(0.45, 0.59, 0.41), vec3(0.48, 0.39, 0.41), vec3(1.21, 0.92, 0.77), vec3(0.57, 0.15, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
