uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.29 * cos(sa * 7.0 + t * 1.35 + ph);
    v = sin((sr - petal) * 6.65);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	p = rot2(2.87) * p;
	p += vec2(-0.23, -0.11) * sin(length(p) * 2.57 - time * 2.28) * 0.32;
	p.y += sin(p.x * 2.68 + time * 1.49) * 0.27;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.11, lr * 2.71 + time * -0.28); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.84));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
