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
    v = sin(sa * 6.65 + sr * 17.89 - t * 0.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 1.15 + time * -0.27); }
	{ p = vec2(atan(p.y, p.x) * 2.27, length(p) * 5.34 - time * 0.91); }
	p = rot2(2.58) * p;
	p = fract(p * 2.15) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.30, vec3(0.45, 0.53, 0.42), vec3(0.40, 0.39, 0.43), vec3(1.39, 0.73, 1.31), vec3(0.94, 0.85, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
