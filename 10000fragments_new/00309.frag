uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.18 + sr * 13.24 - t * 2.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.72, lr * 1.04 + time * 0.69); }
	p = fract(p * 1.23) - 0.5;
	p = rot2(time * -1.45) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.21), field(p, time, 2.41));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
