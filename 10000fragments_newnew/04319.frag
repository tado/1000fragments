uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.63 * sin(mf + 3.0) + ph), cos(t * 2.14 * cos(mf + 3.0) + ph));
        ms += 0.098 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.28;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.48 / 3.1415927, 1.34 / r - time * 1.63);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.27, vec3(0.48, 0.51, 0.46), vec3(0.41, 0.43, 0.34), vec3(1.35, 1.24, 0.76), vec3(0.91, 0.95, 0.96));
	col *= clamp(r * 1.60, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
