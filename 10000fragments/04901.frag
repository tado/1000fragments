uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.10 * sin(mf + 3.0) + ph), cos(t * 0.92 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.93), cos(time * 0.93)) * 0.28;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.44 / 3.1415927, 1.48 / r + time * 1.50);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.23, 0.15, 0.31), vec3(0.71, 0.96, 0.92), cc);
	col *= clamp(r * 1.36, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
