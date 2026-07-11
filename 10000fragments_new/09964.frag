uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.26;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.52; kp = rot2(0.81) * kp; kp *= 1.29; }
    v = sin(kp.x * 1.41 - t * 4.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.50), cos(time * 0.52)) * 0.25;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.59 / 3.1415927, 1.06 / r - time * 2.78);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.03, vec3(0.55, 0.59, 0.57), vec3(0.44, 0.36, 0.31), vec3(1.01, 1.20, 1.25), vec3(0.37, 0.39, 0.11));
	col *= clamp(r * 1.07, 0.0, 1.0);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.34 + time * 7.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
