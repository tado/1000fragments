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
    v = 0.25 * (sin(p.x * 3.43 + t * 3.37 + ph) + sin(p.y * 9.63 - t * 3.37 + ph)
        + sin((p.x + p.y) * 8.09 + t * 3.37 + ph) + sin(length(p) * 3.99 - t * 3.37 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.54 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.70); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.67 + time * 0.09, vec3(0.58, 0.59, 0.54), vec3(0.47, 0.40, 0.34), vec3(1.03, 0.77, 1.22), vec3(0.25, 0.26, 0.18));
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
