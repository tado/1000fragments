uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.38 + t * 2.11 + ph) + sin(p.y * 6.38 - t * 3.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.44, lr * 2.71 + time * -0.81); }
	p = rot2(2.31) * p;
	{ p = vec2(atan(p.y, p.x) * 1.52, length(p) * 5.61 - time * 0.40); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.59), field(p, time, 1.17));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
