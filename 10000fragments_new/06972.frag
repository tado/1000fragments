uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.23 * sin(mf + 3.0) + ph), cos(t * 0.62 * cos(mf + 3.0) + ph));
        ms += 0.032 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.10), cos(time * 0.46)) * 0.21;
	float an = atan(p.y, p.x) + time * 0.60;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.52 / 3.1415927, 0.32 / r - time * 1.50);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.32, vec3(0.59, 0.48, 0.60), vec3(0.47, 0.39, 0.38), vec3(1.07, 0.84, 0.80), vec3(0.35, 0.70, 0.27));
	col *= clamp(r * 1.44, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
