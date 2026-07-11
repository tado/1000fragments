uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.97 * sin(mf + 3.0) + ph), cos(t * 1.97 * cos(mf + 3.0) + ph));
        ms += 0.090 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.64) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.16), field(p, time, 2.31));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
