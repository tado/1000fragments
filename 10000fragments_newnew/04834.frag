uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.06 * sin(mf + 3.0) + ph), cos(t * 1.71 * cos(mf + 3.0) + ph));
        ms += 0.057 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.70; }
	p = fract(p * 1.99) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.24), field(p, time, 2.47));
	col = 0.5 + 0.5 * col;
	col *= 0.82 + 0.14 * sin(gl_FragCoord.y * 2.86 + time * 17.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
