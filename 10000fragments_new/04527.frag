uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.11 * sin(mf + 3.0) + ph), cos(t * 0.72 * cos(mf + 3.0) + ph));
        ms += 0.053 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.32), cos(time * 0.81)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.86 / 3.1415927, 0.90 / r - time * 1.08);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.36, vec3(0.42, 0.51, 0.44), vec3(0.44, 0.41, 0.36), vec3(1.36, 1.20, 1.02), vec3(0.03, 0.63, 0.01));
	col *= clamp(r * 2.98, 0.0, 1.0);
	col = mod(col * 1.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
