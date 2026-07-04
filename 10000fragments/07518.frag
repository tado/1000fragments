uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.61;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.63; kp = rot2(0.31) * kp; kp *= 1.24; }
    v = sin(kp.x * 2.91 - t * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.04), cos(time * 0.76)) * 0.20;
	float an = atan(p.y, p.x) + time * 0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.66 / 3.1415927, 0.72 / r + time * 2.97);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.29, 0.35), vec3(0.97, 0.93, 0.45), cc);
	col *= clamp(r * 2.84, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
