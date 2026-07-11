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
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.40 * sin(mf + 3.0) + ph), cos(t * 1.37 * cos(mf + 3.0) + ph));
        ms += 0.050 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.95), cos(time * 1.33)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.54 / 3.1415927, 0.85 / r - time * 2.10);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.44 + time * 0.05, vec3(0.52, 0.50, 0.55), vec3(0.46, 0.48, 0.35), vec3(0.87, 1.37, 1.29), vec3(0.70, 0.21, 0.78));
	col *= clamp(r * 1.26, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
