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
    float petal = 0.65 + 0.11 * cos(sa * 4 + t * 2.89 + ph);
    v = sin((sr - petal) * 17.15);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.46, lr * 1.06 + time * 0.72); }
	p = rot2(length(p) * 2.88 + time * 1.18) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.12; p = rot2(0.48) * p; }
	p = rot2(0.49) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.15 + time * 0.14, vec3(0.57, 0.43, 0.44), vec3(0.35, 0.43, 0.41), vec3(0.88, 1.24, 1.33), vec3(0.14, 0.26, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
