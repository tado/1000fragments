uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.40 * sin(mf + 3.0) + ph), cos(t * 1.57 * cos(mf + 3.0) + ph));
        ms += 0.037 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.16 / 3.1415927, 1.20 / r + time * 2.49);
	tv.x += tv.y * 0.33;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.61, 1.11, 1.29) + vec3(0.18, 0.13, 0.05);
	col *= clamp(r * 1.59, 0.0, 1.0);
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 2.24 + time * 9.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
