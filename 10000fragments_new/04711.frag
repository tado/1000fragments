uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.29;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.43; kp = rot2(1.62) * kp; kp *= 1.28; }
    v = sin(kp.x * 2.99 - t * 3.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.08), cos(time * 0.81)) * 0.11;
	float an = atan(p.y, p.x) + time * -0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.04 / 3.1415927, 1.07 / r - time * 2.82);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.26, vec3(0.52, 0.56, 0.60), vec3(0.33, 0.44, 0.34), vec3(1.22, 1.25, 0.72), vec3(0.87, 0.47, 0.90));
	col *= clamp(r * 2.56, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
