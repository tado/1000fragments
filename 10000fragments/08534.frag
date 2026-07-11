uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.04 * sin(mf + 3.0) + ph), cos(t * 1.04 * cos(mf + 3.0) + ph));
        ms += 0.053 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	p = fract(p * 2.86) - 0.5;
	p *= 3.04;
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.80, length(p) * 2.46 - time * 0.75); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.20), field(p, time, 0.41));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
