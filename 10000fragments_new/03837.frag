uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 8.78 - t * 1.18 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 14.07 - t * 1.92 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	p = rot2(1.24) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 1.16 + time * 0.69); }
	{ p = vec2(atan(p.y, p.x) * 1.34, length(p) * 3.43 - time * 0.68); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.50));
	col = 0.5 + 0.5 * col;
	col *= 0.85 + 0.20 * sin(gl_FragCoord.y * 2.19 + time * 9.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
