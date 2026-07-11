uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.35 + sin(p.y * 1.27 + t * 2.17) * 4.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.91, lr * 1.62 + time * -0.29); }
	p = rot2(2.95) * p;
	p = fract(p * 2.67) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.18));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
