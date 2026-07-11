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
    vec2 wq = vec2(vnoise2(p * 1.77 + ph), vnoise2(p * 1.77 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.77 + 1.06 * wq + vec2(1.7, 9.2) + t * 1.18),
                   vnoise2(p * 1.77 + 2.45 * wq + vec2(8.3, 2.8) - t * 0.95));
    v = vnoise2(p * 1.77 + 3.22 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.34 + 0.18 * pow(abs(cos(ra * 7.0 + t * 1.22)), 0.80);
    v = sin((rr - pet) * 17.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.61);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.18, 0.37), vec3(0.73, 0.76, 0.79), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
