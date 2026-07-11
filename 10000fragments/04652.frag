uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 15.40 - t * 3.21 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 24.65 - t * 3.21 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.33) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.31; p = rot2(1.80) * p; }
	p = fract(p * 2.67) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 2.80 + time * 0.19); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.14));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
