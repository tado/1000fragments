uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.48;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.61; kp = rot2(1.17) * kp; kp *= 1.37; }
    v = sin(kp.x * 2.66 - t * 4.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.60), cos(time * 1.28)) * 0.09;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.21 / 3.1415927, 0.80 / r + time * 2.81);
	tv.x += tv.y * 0.24;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.47 + time * 0.23, vec3(0.47, 0.44, 0.50), vec3(0.32, 0.38, 0.38), vec3(1.15, 1.29, 0.79), vec3(0.51, 0.86, 0.30));
	col *= clamp(r * 1.14, 0.0, 1.0);
	col = mod(col * 1.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
