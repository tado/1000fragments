uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.21 * cos(sa * 9 + t * 1.74 + ph);
    v = sin((sr - petal) * 9.36);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	p = rot2(1.14) * p;
	p *= 2.57;
	p = rot2(length(p) * -1.69 + time * 0.29) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.13), field(p, time, 2.25));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
