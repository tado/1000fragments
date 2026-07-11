uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.39;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.47; kp = rot2(2.22) * kp; kp *= 1.22; }
    v = sin(kp.y * 1.58 - t * 2.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.65 / 3.1415927, 1.35 / r - time * 2.77);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.23, vec3(0.47, 0.44, 0.59), vec3(0.44, 0.48, 0.40), vec3(0.84, 0.86, 0.72), vec3(0.70, 0.11, 0.47));
	col *= clamp(r * 1.63, 0.0, 1.0);
	col = mod(col * 1.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
