uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.66;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.76; kp = rot2(0.53) * kp; kp *= 1.35; }
    v = sin(kp.x * 1.81 - t * 4.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.69;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.02 / 3.1415927, 0.44 / r - time * 1.97);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.47 + time * 0.23, vec3(0.50, 0.47, 0.48), vec3(0.36, 0.47, 0.35), vec3(1.03, 0.87, 1.20), vec3(0.39, 0.75, 0.18));
	col *= clamp(r * 2.21, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
