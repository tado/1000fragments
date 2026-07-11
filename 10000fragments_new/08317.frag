uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.64 * sin(mf + 3.0) + ph), cos(t * 2.22 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	{ float fr = length(p); p *= 1.0 + -0.55 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.64, length(p) * 5.75 - time * 0.54); }
	p = (floor(p * 15.8) + 0.5) / 15.8;
	p = fract(p * 2.96) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.69));
	col = 0.5 + 0.5 * col;
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 1.86 + time * 8.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
