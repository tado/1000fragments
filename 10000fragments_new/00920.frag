uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.26 * cos(sa * 4.0 + t * 1.28 + ph);
    v = sin((sr - petal) * 6.74);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	p = rot2(length(p) * 3.45 + time * 0.36) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.35, lr * 1.47 + time * -0.51); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.50, 0.56, 0.47) * (0.19 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 2.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
