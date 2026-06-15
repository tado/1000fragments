uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.19 * cos(sa * 8 + t * 2.10 + ph);
    v = sin((sr - petal) * 15.32);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 2.29 + time * -0.16); }
	{ p = vec2(atan(p.y, p.x) * 1.10, length(p) * 5.40 - time * 0.75); }
	p = rot2(2.66) * p;
	p = fract(p * 2.17) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.52), field(p, time, 1.04));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
