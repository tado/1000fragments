uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.67 + sr * 17.53 - t * 1.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(2.36) * p; }
	p = fract(p * 2.30) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.46, length(p) * 3.51 - time * 0.12); }
	{ float fr = length(p); p *= 1.0 + -0.77 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.62));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
