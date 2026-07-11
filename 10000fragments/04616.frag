uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 26.65 - t * 7.33 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 8.94 - t * 7.33 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.30;
	p = rot2(time * -0.78) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 1.62 + time * -0.40); }
	p = abs(p) - 0.74;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.17; p = rot2(1.52) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.48));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
