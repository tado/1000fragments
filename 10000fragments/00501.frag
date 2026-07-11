uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.06 + sin(p.y * 5.30 + t * 2.40) * 4.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 3.23;
	{ p = vec2(atan(p.y, p.x) * 1.21, length(p) * 4.39 - time * 0.60); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.66, lr * 2.30 + time * -0.42); }
	p = rot2(length(p) * 3.21 + time * 0.65) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.72));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
