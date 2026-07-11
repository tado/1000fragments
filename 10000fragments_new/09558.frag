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
    float grow = floor(p.y * 12.84);
    float gsh = hash21(vec2(grow, floor(t * 5.10))) - 0.5;
    float gx = p.x + gsh * 0.86;
    v = sin(gx * 6.96 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.62));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.28;
	p = rot2(0.65) * p;
	p = rot2(p.y * -1.76 + time * 0.81) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.09, lr * 2.94 + time * -0.29); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.21, vec3(0.56, 0.49, 0.42), vec3(0.35, 0.31, 0.43), vec3(0.81, 1.33, 1.09), vec3(0.70, 0.79, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
