uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.61 + t * 1.99 + ph) + sin(p.y * 4.92 - t * 1.99 + ph)
        + sin((p.x + p.y) * 7.78 + t * 1.99 + ph) + sin(length(p) * 16.05 - t * 1.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	p = rot2(length(p) * 1.72 + time * 0.40) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.40, lr * 1.91 + time * 0.31); }
	p = rot2(p.y * 3.02 + time * 0.42) * p;
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.74));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
