uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.03 * sin(mf + 3.0) + ph), cos(t * 2.03 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.34, -0.82) * sin(length(p) * 5.95 - time * 0.88) * 0.15;
	p *= 1.75;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.93, lr * 2.33 + time * -0.56); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(0.84) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.56));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
