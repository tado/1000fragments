uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.04, t * 0.42 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.42;
	p += vec2(0.38, 0.35) * sin(length(p) * 4.83 - time * 1.86) * 0.24;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.79, lr * 1.25 + time * 0.59); }
	p = rot2(p.y * -3.24 + time * 0.89) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.57; p = rot2(1.89) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.08, vec3(0.60, 0.45, 0.54), vec3(0.41, 0.36, 0.44), vec3(1.11, 1.36, 0.75), vec3(0.27, 0.60, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
