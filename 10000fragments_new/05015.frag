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
    float ma = sin(length(p - vec2(0.60, 0.0)) * 36.78 - t * 2.59 + ph);
    float mb = sin(length(p + vec2(0.60, 0.0)) * 9.62 - t * 6.53 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.40 + ph), vnoise2(p * 2.40 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.40 + 3.53 * wq + vec2(1.7, 9.2) + t * 0.48),
                   vnoise2(p * 2.40 + 2.36 * wq + vec2(8.3, 2.8) - t * 0.87));
    v = vnoise2(p * 2.40 + 3.03 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.99;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + -0.50 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.42, 1.25, 1.18) + vec3(0.23, 0.25, 0.23);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
