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
    float petal = 0.53 + 0.13 * cos(sa * 6 + t * 2.10 + ph);
    v = sin((sr - petal) * 19.69);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.30;
	p = rot2(p.y * -2.37 + time * 0.65) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.51, lr * 2.72 + time * -0.22); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.43; p = rot2(2.47) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.03, vec3(0.59, 0.42, 0.53), vec3(0.34, 0.47, 0.38), vec3(1.06, 0.73, 1.11), vec3(0.82, 0.48, 0.70));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
