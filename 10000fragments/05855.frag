uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.42 * sin(mf + 3.0) + ph), cos(t * 0.50 * cos(mf + 3.0) + ph));
        ms += 0.098 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.94), cos(time * 0.44)) * 0.17;
	float an = atan(p.y, p.x) + time * -0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.66 / 3.1415927, 0.50 / r + time * 1.93);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.52 + time * 0.17);
	col *= clamp(r * 1.10, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
