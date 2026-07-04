uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.45 * sin(mf + 3.0) + ph), cos(t * 2.10 * cos(mf + 3.0) + ph));
        ms += 0.078 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.40 / 3.1415927, 0.60 / r + time * 2.90);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.43 + time * 0.35, vec3(0.47, 0.52, 0.49), vec3(0.43, 0.34, 0.32), vec3(1.28, 1.27, 1.22), vec3(0.90, 0.30, 0.01));
	col *= clamp(r * 1.63, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
