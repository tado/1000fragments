uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.91 * sin(mf + 3.0) + ph), cos(t * 1.22 * cos(mf + 3.0) + ph));
        ms += 0.026 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.36), cos(time * 0.53)) * 0.28;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.04 / 3.1415927, 0.97 / r + time * 2.04);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.30, vec3(0.45, 0.41, 0.55), vec3(0.43, 0.31, 0.35), vec3(1.34, 1.01, 0.77), vec3(0.57, 0.27, 0.80));
	col *= clamp(r * 1.90, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
