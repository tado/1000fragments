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
    vec2 wq = vec2(vnoise2(p * 3.98 + ph), vnoise2(p * 3.98 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.98 + 2.33 * wq + vec2(1.7, 9.2) + t * 1.12),
                   vnoise2(p * 3.98 + 1.74 * wq + vec2(8.3, 2.8) - t * 0.94));
    v = vnoise2(p * 3.98 + 3.85 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.25 * pow(abs(cos(ra * 2.0 + t * 2.95)), 2.20);
    v = sin((rr - pet) * 15.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.12) - 0.5;
	q2 += vec2(0.15, 0.02) * sin(length(q2) * 3.33 - time * 1.77) * 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.05, 0.48), vec3(0.57, 0.61, 0.84), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
