uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.47;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.79; kp = rot2(0.36) * kp; kp *= 1.39; }
    v = sin(kp.x * 1.15 - t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.19 / 3.1415927, 1.01 / r + time * 2.47);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.07, vec3(0.57, 0.59, 0.42), vec3(0.42, 0.45, 0.43), vec3(1.06, 1.12, 1.28), vec3(0.23, 0.39, 0.18));
	col *= clamp(r * 2.37, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
