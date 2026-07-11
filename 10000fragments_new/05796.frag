uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.39 * sin(mf + 3.0) + ph), cos(t * 2.15 * cos(mf + 3.0) + ph));
        ms += 0.033 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.33), cos(time * 0.43)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.77 / 3.1415927, 1.33 / r - time * 1.81);
	tv.x += tv.y * 0.25;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.28, vec3(0.43, 0.50, 0.45), vec3(0.48, 0.40, 0.42), vec3(0.94, 0.95, 0.81), vec3(0.06, 0.32, 0.41));
	col *= clamp(r * 1.17, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
