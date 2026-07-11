uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.73;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.52; kp = rot2(2.24) * kp; kp *= 1.21; }
    v = sin(kp.y * 1.85 - t * 1.22 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.18 / 3.1415927, 1.22 / r - (time * 0.67) * 0.74);
	tv.x += tv.y * 0.37;
	float d = field(tv, (time * 0.67), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.06, 0.14), vec3(0.76, 0.64, 0.76), cc);
	col *= clamp(r * 1.00, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.050, 1.000, 0.947) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
