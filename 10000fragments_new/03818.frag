uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.37;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.80; kp = rot2(1.13) * kp; kp *= 1.39; }
    v = sin(kp.x * 2.45 - t * 3.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.57), cos(time * 0.73)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.19 / 3.1415927, 0.98 / r - time * 1.34);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.24, 1.27, 0.98) + vec3(0.20, 0.13, 0.21);
	col *= clamp(r * 1.61, 0.0, 1.0);
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
