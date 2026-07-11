uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.15 * sin(mf + 3.0) + ph), cos(t * 1.26 * cos(mf + 3.0) + ph));
        ms += 0.041 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.91), cos(time * 1.15)) * 0.18;
	float an = atan(p.y, p.x) + time * -0.79;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.69 / 3.1415927, 0.82 / r + time * 0.58);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.58 + time * 0.29);
	col *= clamp(r * 1.49, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
