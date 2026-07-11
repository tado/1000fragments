uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.08;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.70; kp = rot2(2.33) * kp; kp *= 1.27; }
    v = sin(kp.x * 2.49 - t * 1.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.71) * -0.34;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.54 / 3.1415927, 0.80 / r - (time * 0.71) * 1.55);
	float d = field(tv, (time * 0.71), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.27, 0.26), vec3(0.64, 0.51, 0.63), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 1.92, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.12));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.940, 0.978, 1.023) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
