uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.27 * sin(mf + 3.0) + ph), cos(t * 1.10 * cos(mf + 3.0) + ph));
        ms += 0.021 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.23), cos(time * 0.91)) * 0.19;
	float an = atan(p.y, p.x) + time * -0.66;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.20 / 3.1415927, 1.19 / r - time * 0.70);
	tv.x += tv.y * 0.27;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.72 + time * 0.73);
	col *= clamp(r * 1.26, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
