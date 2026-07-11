uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 33.40 - t * 1.86 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 31.43 - t * 1.86 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	{ p = vec2(atan(p.y, p.x) * 2.82, length(p) * 2.35 - time * 0.57); }
	p = rot2(p.y * 3.19 + time * 0.68) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.53, lr * 1.91 + time * 0.68); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.21), field(p, time, 0.41));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
