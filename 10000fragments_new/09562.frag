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
    vec2 wq = vec2(vnoise2(p * 3.02 + ph), vnoise2(p * 3.02 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.02 + 3.46 * wq + vec2(1.7, 9.2) + t * 0.83),
                   vnoise2(p * 3.02 + 1.10 * wq + vec2(8.3, 2.8) - t * 0.55));
    v = vnoise2(p * 3.02 + 2.72 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.83 + ph), vnoise2(p * 3.83 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.83 + 1.43 * wq + vec2(1.7, 9.2) + t * 0.57),
                   vnoise2(p * 3.83 + 1.91 * wq + vec2(8.3, 2.8) - t * 0.57));
    v = vnoise2(p * 3.83 + 1.88 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 7.21 + time * 1.82) * 0.33;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.37, 1.03, 1.35) + vec3(0.14, 0.22, 0.14);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
