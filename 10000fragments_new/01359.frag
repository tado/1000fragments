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
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.41 * sin(mf + 3.0) + ph), cos(t * 1.31 * cos(mf + 3.0) + ph));
        ms += 0.090 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.29;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.13 / 3.1415927, 1.06 / r - time * 2.44);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.04, vec3(0.41, 0.57, 0.53), vec3(0.47, 0.49, 0.37), vec3(1.31, 1.16, 0.72), vec3(0.44, 0.97, 0.04));
	col *= clamp(r * 1.13, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
