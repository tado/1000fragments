uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.77 - t * 5.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.42;
	p = rot2(1.86) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.30, lr * 2.57 + time * -0.11); }
	{ p = vec2(atan(p.y, p.x) * 1.05, length(p) * 5.81 - time * 0.69); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.55; p = rot2(1.38) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.60));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
