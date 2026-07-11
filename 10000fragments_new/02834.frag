uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.49 * sin(mf + 3.0) + ph), cos(t * 1.27 * cos(mf + 3.0) + ph));
        ms += 0.020 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.65 / 3.1415927, 1.13 / r - time * 1.69);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.01, vec3(0.43, 0.49, 0.46), vec3(0.33, 0.39, 0.39), vec3(1.09, 0.77, 1.00), vec3(0.21, 0.87, 0.67));
	col *= clamp(r * 1.20, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
