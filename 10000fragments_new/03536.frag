uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.81;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.68; kp = rot2(1.86) * kp; kp *= 1.38; }
    v = sin(kp.y * 3.27 - t * 4.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.57 / 3.1415927, 0.67 / r - time * 1.68);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.34, vec3(0.42, 0.48, 0.58), vec3(0.43, 0.47, 0.39), vec3(0.72, 1.04, 1.22), vec3(0.61, 0.07, 0.90));
	col *= clamp(r * 1.37, 0.0, 1.0);
	col = mod(col * 2.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
