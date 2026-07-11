uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 8.21 - t * 1.14 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 9.22 - t * 1.14 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.98, length(p) * 3.75 - time * 0.49); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.25, lr * 1.51 + time * 0.29); }
	p = rot2(p.y * -3.67 + time * 0.75) * p;
	p = rot2(time * -1.15) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.80));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
