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
    float wa = sin(p.x * 16.27 + t * 3.26 + ph) * 0.7;
    float wb = sin(p.y * 10.65 - t * 1.35 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.59;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.64, t * 2.28)) - 0.5) * 0.86;
    v = exp(-abs(bx) * 4.22) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.21 * sin(time * 4.02);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.54);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.64 + time * 0.13, vec3(0.58, 0.57, 0.58), vec3(0.47, 0.32, 0.43), vec3(1.01, 1.33, 1.25), vec3(0.70, 0.70, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
