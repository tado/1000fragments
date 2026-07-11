uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.22;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.70; kp = rot2(0.98) * kp; kp *= 1.19; }
    v = sin(kp.x * 1.53 - t * 2.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.19;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.94 / 3.1415927, 0.53 / r - time * 1.04);
	tv.x += tv.y * 0.46;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.15, vec3(0.42, 0.43, 0.47), vec3(0.42, 0.32, 0.44), vec3(1.25, 1.34, 0.91), vec3(0.05, 0.06, 0.80));
	col *= clamp(r * 2.29, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
