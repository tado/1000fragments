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
    float bx = p.x + (vnoise2(vec2(p.y * 1.61, t * 2.93)) - 0.5) * 1.30;
    v = exp(-abs(bx) * 5.58) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.65);
    float gsh = hash21(vec2(grow, floor(t * 4.28))) - 0.5;
    float gx = p.x + gsh * 0.66;
    v = sin(gx * 11.80 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.20));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.09, length(q2) * 2.73 - time * 0.52); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.88);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.32 + time * 0.20, vec3(0.46, 0.51, 0.57), vec3(0.39, 0.41, 0.36), vec3(0.91, 0.79, 1.37), vec3(0.73, 0.91, 0.96));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
