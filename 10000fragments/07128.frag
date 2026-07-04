uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.95);
    float gsh = hash21(vec2(grow, floor(t * 6.41))) - 0.5;
    float gx = p.x + gsh * 0.55;
    v = sin(gx * 6.37 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.30));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	{ p = vec2(atan(p.y, p.x) * 2.83, length(p) * 3.72 - time * 0.63); }
	p += vec2(-0.16, 0.01) * sin(length(p) * 5.62 - time * 1.74) * 0.35;
	{ float fr = length(p); p *= 1.0 + -0.66 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.26, vec3(0.58, 0.48, 0.60), vec3(0.48, 0.39, 0.44), vec3(1.02, 1.35, 1.02), vec3(0.12, 0.57, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
