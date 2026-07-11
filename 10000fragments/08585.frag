uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.20 * sin(mf + 3.0) + ph), cos(t * 1.20 * cos(mf + 3.0) + ph));
        ms += 0.025 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.62, lr * 1.79 + time * 0.72); }
	p = fract(p * 2.20) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.23));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
