uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.60 + t * 4.34 + ph) + sin(p.y * 9.89 - t * 4.32 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.63 + sr * 17.38 - t * 4.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.38; p = rot2(0.42) * p; }
	p = rot2(time * -0.45) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.93, lr * 1.61 + time * 0.16); }
	p = rot2(p.y * 1.34 + time * 0.66) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.71 + time * 0.28, vec3(0.49, 0.59, 0.59), vec3(0.47, 0.39, 0.36), vec3(1.31, 1.24, 1.13), vec3(0.45, 0.72, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
