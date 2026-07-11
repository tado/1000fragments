uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.32 * sin(mf + 3.0) + ph), cos(t * 1.19 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.95 / 3.1415927, 0.70 / r - time * 0.93);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.48, 0.27, 0.33) * (0.23 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 2.20, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
