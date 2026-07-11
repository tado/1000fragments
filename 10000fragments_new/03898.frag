uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.10 * cos(sa * 7.0 + t * 0.71 + ph);
    v = sin((sr - petal) * 15.67);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.51;
	p = rot2(length(p) * 3.57 + time * 1.45) * p;
	p = fract(p * 1.78) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.00, lr * 2.66 + time * 0.50); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 2.00));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.17, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
