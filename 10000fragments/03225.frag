uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.83 + vec2(t * 2.14, -t * 2.14) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.36, lr * 1.67 + time * -0.23); }
	p = rot2(1.48) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.60; p = rot2(2.14) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.48, length(p) * 5.52 - time * 0.25); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.87));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
