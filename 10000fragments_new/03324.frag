uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.49;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.60; kp = rot2(0.32) * kp; kp *= 1.21; }
    v = sin(kp.y * 1.76 - t * 4.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.17 / 3.1415927, 1.01 / r - time * 1.12);
	tv.x += tv.y * 0.43;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.18, vec3(0.54, 0.45, 0.58), vec3(0.36, 0.46, 0.40), vec3(1.19, 0.87, 0.83), vec3(0.51, 0.14, 0.26));
	col *= clamp(r * 2.55, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
