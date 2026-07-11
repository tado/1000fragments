uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.13 + t * 0.60 + ph) + sin(p.y * 2.11 - t * 2.09 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.39) * p;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.16, lr * 2.78 + time * -0.69); }
	p = fract(p * 2.71) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.55));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
