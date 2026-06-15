uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.58 + vec2(t * 1.77, -t * 1.77) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	{ float fr = length(p); p *= 1.0 + 0.60 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(2.58) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.06, lr * 1.30 + time * -0.60); }
	p = rot2(2.56) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.03, vec3(0.58, 0.44, 0.59), vec3(0.44, 0.44, 0.33), vec3(0.72, 0.86, 1.32), vec3(0.96, 0.69, 0.19));
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
