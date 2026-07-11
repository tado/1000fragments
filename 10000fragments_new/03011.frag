uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.58 * sin(mf + 3.0) + ph), cos(t * 2.10 * cos(mf + 3.0) + ph));
        ms += 0.092 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.22, 0.16, 0.92) * (0.23 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 1.52 + time * 8.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
