uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
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
    float wr = length(p) + 0.25 * vnoise2(p * 4.50 + t * 0.86);
    v = sin(wr * 29.10 - t * 3.74 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.90 + t * 4.55 + ph) + sin(p.y * 5.69 - t * 4.55 + ph)
        + sin((p.x + p.y) * 7.93 + t * 4.55 + ph) + sin(length(p) * 10.27 - t * 4.55 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	p = rot2(length(p) * 1.99 + time * 0.74) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.82);
	float d = d1 * d2;
	vec3 col = palette(d * 0.61 + time * 0.27, vec3(0.57, 0.54, 0.42), vec3(0.32, 0.44, 0.34), vec3(0.71, 0.90, 1.18), vec3(0.74, 0.93, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
