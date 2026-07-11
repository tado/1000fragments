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
    vec2 cq = p * 8.84 + vec2(t * 0.54, -t * 2.21) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.02 + ph), vnoise2(p * 2.02 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.02 + 1.43 * wq + vec2(1.7, 9.2) + t * 0.75),
                   vnoise2(p * 2.02 + 2.79 * wq + vec2(8.3, 2.8) - t * 1.18));
    v = vnoise2(p * 2.02 + 3.51 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.15;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.77);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.26, vec3(0.42, 0.57, 0.52), vec3(0.39, 0.44, 0.42), vec3(1.25, 0.73, 0.74), vec3(0.23, 0.49, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
