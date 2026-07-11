uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.67 - t * 4.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	p = rot2(1.10) * p;
	p = fract(p * 2.58) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.23, lr * 1.20 + time * -0.77); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.68));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
