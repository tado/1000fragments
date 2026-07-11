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
    v = sin(sa * 2.48 + sr * 22.28 - t * 0.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	p += vec2(0.22, 0.88) * sin(length(p) * 3.56 - time * 1.61) * 0.27;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.41, lr * 2.30 + time * -0.18); }
	p = rot2(time * -0.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.03, vec3(0.59, 0.49, 0.50), vec3(0.39, 0.47, 0.31), vec3(0.74, 1.07, 1.24), vec3(0.62, 0.64, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
