uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.23;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.49; kp = rot2(0.47) * kp; kp *= 1.31; }
    v = sin(kp.x * 2.68 - t * 2.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.83) * -0.26;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.74 / 3.1415927, 0.51 / r - (time * 0.83) * 2.27);
	tv.x += tv.y * 0.20;
	float d = field(tv, (time * 0.83), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.06, 0.07), vec3(0.72, 0.66, 0.67), cc);
	col *= clamp(r * 1.38, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.987, 1.058) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
