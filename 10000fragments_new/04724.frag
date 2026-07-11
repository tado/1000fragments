uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.48 * sin(mf + 3.0) + ph), cos(t * 2.18 * cos(mf + 3.0) + ph));
        ms += 0.059 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.48;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.13 / 3.1415927, 0.49 / r - time * 0.75);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.31 + time * 0.75);
	col *= clamp(r * 2.40, 0.0, 1.0);
	col = mod(col * 2.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
