uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.47;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.70; kp = rot2(0.42) * kp; kp *= 1.43; }
    v = sin(kp.y * 1.41 - t * 4.62 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.26;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.00 / 3.1415927, 0.38 / r - time * 0.95);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.15, vec3(0.45, 0.40, 0.53), vec3(0.50, 0.37, 0.40), vec3(0.75, 1.21, 0.84), vec3(0.74, 0.43, 0.63));
	col *= clamp(r * 1.46, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
