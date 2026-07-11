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

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 18.29 - t * 4.60 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 28.99 - t * 1.90 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.94 + ph), vnoise2(p * 1.94 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.94 + 1.39 * wq + vec2(1.7, 9.2) + t * 0.90),
                   vnoise2(p * 1.94 + 2.29 * wq + vec2(8.3, 2.8) - t * 0.43));
    v = vnoise2(p * 1.94 + 3.91 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.02 + t * 2.33 + ph) + sin(p.y * 13.32 - t * 2.54 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.62);
	float d3 = fieldC(q3, time, 1.34);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = vec3(0.52, 0.74, 0.95) * (0.06 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
