uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.86);
    float gsh = hash21(vec2(grow, floor(t * 6.08))) - 0.5;
    float gx = p.x + gsh * 0.96;
    v = sin(gx * 10.62 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.82));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.84, lr * 2.95 + time * 0.97); }
	p = rot2(1.28) * p;
	p.y += sin(p.x * 4.40 + time * 1.47) * 0.32;
	{ float fr = length(p); p *= 1.0 + 0.54 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.99, 0.63, 0.51) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
