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
    vec2 wq = vec2(vnoise2(p * 2.28 + ph), vnoise2(p * 2.28 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.28 + 1.32 * wq + vec2(1.7, 9.2) + t * 0.82),
                   vnoise2(p * 2.28 + 2.74 * wq + vec2(8.3, 2.8) - t * 1.16));
    v = vnoise2(p * 2.28 + 3.64 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.23 * pow(abs(cos(ra * 5.0 + t * 2.57)), 2.73);
    v = sin((rr - pet) * 18.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.97);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.87));
	vec3 col = vec3(0.74, 0.60, 0.35) * (0.14 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
