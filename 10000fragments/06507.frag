uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.98 + t * 2.36 + ph) + sin(p.y * 8.15 - t * 2.36 + ph)
        + sin((p.x + p.y) * 3.05 + t * 2.36 + ph) + sin(length(p) * 6.15 - t * 2.36 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.18;
	p += vec2(-0.20, -0.46) * sin(length(p) * 3.17 - time * 0.51) * 0.37;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(1.76) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.90, lr * 1.49 + time * -0.38); }
	p *= 1.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.17));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
