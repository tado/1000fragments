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
    float grow = floor(p.y * 14.33);
    float gsh = hash21(vec2(grow, floor(t * 6.57))) - 0.5;
    float gx = p.x + gsh * 1.16;
    v = sin(gx * 19.10 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.46));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.25 * vnoise2(p * 3.17 + t * 1.46);
    v = sin(wr * 26.56 - t * 1.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.88;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.54 + time * 0.40, vec3(0.59, 0.57, 0.56), vec3(0.34, 0.50, 0.39), vec3(0.95, 1.33, 0.92), vec3(0.65, 0.78, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
