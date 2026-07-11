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
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.39 * sin(mf + 3.0) + ph), cos(t * 0.31 * cos(mf + 3.0) + ph));
        ms += 0.034 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.40 * vnoise2(p * 5.66 + t * 0.34);
    v = sin(wr * 10.25 - t * 3.98 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.02 + ph), vnoise2(p * 2.02 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.02 + 2.57 * wq + vec2(1.7, 9.2) + t * 0.55),
                   vnoise2(p * 2.02 + 1.61 * wq + vec2(8.3, 2.8) - t * 0.38));
    v = vnoise2(p * 2.02 + 1.52 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 1.71 + time * 2.35) * 0.80;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d3 = fieldC(q3, time, 1.89);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.64 + time * 0.35, vec3(0.40, 0.60, 0.59), vec3(0.43, 0.35, 0.46), vec3(1.10, 0.94, 0.94), vec3(0.72, 0.66, 0.79));
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
