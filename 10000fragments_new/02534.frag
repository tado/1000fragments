uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.43, t * 1.29 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.75);
    float gsh = hash21(vec2(grow, floor(t * 2.54))) - 0.5;
    float gx = p.x + gsh * 0.33;
    v = sin(gx * 8.48 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.69));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 3.64 + time * 1.40) * p;
	{ float fr = length(p); p *= 1.0 + 0.38 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.34, length(p) * 4.30 - time * 0.37); }
	p = (floor(p * 23.3) + 0.5) / 23.3;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.42 + time * 0.06, vec3(0.54, 0.57, 0.48), vec3(0.30, 0.39, 0.41), vec3(1.16, 1.10, 1.38), vec3(0.39, 0.26, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
