uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.50);
    float gsh = hash21(vec2(grow, floor(t * 8.99))) - 0.5;
    float gx = p.x + gsh * 0.96;
    v = sin(gx * 13.15 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.72));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.66;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.00, lr * 2.82 + time * -0.89); }
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.01, vec3(0.53, 0.47, 0.49), vec3(0.48, 0.43, 0.44), vec3(1.01, 1.33, 0.71), vec3(0.81, 0.20, 0.82));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.71 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
