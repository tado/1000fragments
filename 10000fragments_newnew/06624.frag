uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.18;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.56; kp = rot2(2.77) * kp; kp *= 1.40; }
    v = sin(kp.x * 2.92 - t * 1.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.95), cos(time * 0.90)) * 0.14;
	float an = atan(p.y, p.x) + time * 0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.86 / 3.1415927, 0.58 / r - time * 2.88);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.06, vec3(0.52, 0.51, 0.53), vec3(0.40, 0.39, 0.47), vec3(0.80, 1.33, 0.81), vec3(0.24, 0.23, 0.82));
	col *= clamp(r * 2.96, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
