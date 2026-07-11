uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.80 * sin(mf + 3.0) + ph), cos(t * 1.35 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 2.69 - time * 0.95); }
	p = (floor(p * 29.9) + 0.5) / 29.9;
	p.x += sin(p.y * 4.20 + time * 1.01) * 0.26;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.72), field(p, time, 1.44));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.01, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
