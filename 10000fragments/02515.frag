uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.15 * cos(sa * 4 + t * 2.75 + ph);
    v = sin((sr - petal) * 10.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.37, lr * 1.92 + time * -0.36); }
	p = rot2(length(p) * -3.05 + time * 0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.55, 1.10, 0.75) + vec3(0.28, 0.12, 0.02);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
