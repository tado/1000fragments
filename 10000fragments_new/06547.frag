uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.62 * sin(mf + 3.0) + ph), cos(t * 0.46 * cos(mf + 3.0) + ph));
        ms += 0.100 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.47), cos(time * 1.44)) * 0.09;
	float an = atan(p.y, p.x) + time * -0.25;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.16 / 3.1415927, 0.99 / r + time * 1.17);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.31, 0.27, 0.63) * (0.22 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 2.93, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
