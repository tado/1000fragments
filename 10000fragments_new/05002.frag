uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.84);
    float gsh = hash21(vec2(grow, floor(t * 7.08))) - 0.5;
    float gx = p.x + gsh * 0.55;
    v = sin(gx * 12.58 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.19));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.04, t * 1.08 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.84, lr * 1.24 + time * 0.42); }
	p = (floor(p * 25.8) + 0.5) / 25.8;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = d1 * d2;
	vec3 col = palette(d * 1.36 + time * 0.13, vec3(0.55, 0.60, 0.41), vec3(0.40, 0.44, 0.45), vec3(1.13, 1.32, 1.29), vec3(0.52, 0.61, 0.93));
	col = mod(col * 1.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
