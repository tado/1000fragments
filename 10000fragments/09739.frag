uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.46 * sin(mf + 3.0) + ph), cos(t * 2.38 * cos(mf + 3.0) + ph));
        ms += 0.096 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.90), cos(time * 1.12)) * 0.18;
	float an = atan(p.y, p.x) + time * -0.35;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.10 / 3.1415927, 1.08 / r + time * 1.30);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.13, 1.34, 1.09) + vec3(0.08, 0.16, 0.04);
	col *= clamp(r * 2.18, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
