uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.29 + sr * 5.79 - t * 3.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.13, lr * 1.97 + time * -0.23); }
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.42; p = rot2(1.33) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.29, vec3(0.46, 0.51, 0.47), vec3(0.30, 0.37, 0.48), vec3(1.05, 1.39, 0.90), vec3(0.28, 0.70, 0.32));
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
