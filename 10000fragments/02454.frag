uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.12 * cos(sa * 5 + t * 1.45 + ph);
    v = sin((sr - petal) * 12.84);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.14, lr * 2.63 + time * 0.21); }
	p += vec2(0.44, 0.12) * sin(length(p) * 3.04 - time * 1.76) * 0.17;
	p = rot2(p.y * -1.12 + time * 0.91) * p;
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.36, 0.29), vec3(0.61, 0.59, 0.75), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
