uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.23 + vec2(t * 2.17, -t * 2.62) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.35);
    float gsh = hash21(vec2(grow, floor(t * 8.80))) - 0.5;
    float gx = p.x + gsh * 1.13;
    v = sin(gx * 15.22 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.92));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 2.27 + time * 1.23) * 0.27;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 1.19;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.50);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.87 + time * 0.24, vec3(0.46, 0.44, 0.41), vec3(0.46, 0.32, 0.45), vec3(1.21, 1.36, 0.71), vec3(0.43, 0.26, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
