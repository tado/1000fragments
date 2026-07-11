uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.89 + sin(p.y * 2.72 + t * 0.60) * 2.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.58; p = rot2(0.45) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.45, lr * 2.02 + time * -0.63); }
	p = abs(p) - 0.65;
	p = rot2(p.y * 2.59 + time * 0.19) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.84));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
