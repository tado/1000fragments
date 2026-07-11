uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.06 * sin(mf + 3.0) + ph), cos(t * 2.06 * cos(mf + 3.0) + ph));
        ms += 0.093 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
