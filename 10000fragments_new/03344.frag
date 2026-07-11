uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.85 * sin(mf + 3.0) + ph), cos(t * 1.85 * cos(mf + 3.0) + ph));
        ms += 0.080 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.89), cos(time * 0.49)) * 0.23;
	float an = atan(p.y, p.x) + time * 0.35;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.34 / 3.1415927, 1.02 / r - time * 2.74);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.88 + time * 0.34);
	col *= clamp(r * 1.02, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
