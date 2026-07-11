uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.27 + t * 3.67 + ph) + sin(p.y * 8.24 - t * 3.67 + ph)
        + sin((p.x + p.y) * 10.50 + t * 3.67 + ph) + sin(length(p) * 10.16 - t * 3.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.59;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.09, lr * 1.82 + time * -0.54); }
	p = fract(p * 1.20) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.27 * fr * fr; }
	p = rot2(p.y * 3.22 + time * 0.11) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.74));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
