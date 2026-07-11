uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.82;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.45; kp = rot2(2.61) * kp; kp *= 1.16; }
    v = sin(kp.y * 1.84 - t * 3.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.63) * 0.99), cos((time * 0.63) * 0.48)) * 0.24;
	float an = atan(p.y, p.x) + (time * 0.63) * 0.79;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.39 / 3.1415927, 0.72 / r + (time * 0.63) * 0.68);
	tv.x += tv.y * 0.23;
	float d = field(tv, (time * 0.63), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.63, 0.60, 0.54) + vec3(0.05, 0.10, 0.04);
	col *= clamp(r * 2.95, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.973, 1.018, 0.959) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
