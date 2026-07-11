uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.24 * cos(sa * 7 + t * 2.83 + ph);
    v = sin((sr - petal) * 11.31);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	p = abs(p) - 0.49;
	p = rot2(time * -1.16) * p;
	p *= 2.66;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.14, lr * 1.34 + time * -0.71); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.97), field(p, time, 1.93));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
