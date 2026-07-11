uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.73 * sin(mf + 3.0) + ph), cos(t * 0.73 * cos(mf + 3.0) + ph));
        ms += 0.021 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.64, lr * 1.73 + time * 0.22); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.16; p = rot2(0.68) * p; }
	p = rot2(1.73) * p;
	{ p = vec2(atan(p.y, p.x) * 2.54, length(p) * 5.36 - time * 0.74); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.43), field(p, time, 0.86));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
