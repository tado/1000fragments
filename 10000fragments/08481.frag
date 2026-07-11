uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.96 * sin(mf + 3.0) + ph), cos(t * 1.96 * cos(mf + 3.0) + ph));
        ms += 0.040 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 3.26 + time * 1.10) * p;
	p = rot2(p.y * 3.39 + time * 0.23) * p;
	p = rot2(time * -1.10) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.12, lr * 2.96 + time * 0.79); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.47));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
