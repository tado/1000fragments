uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.89;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.64; kp = rot2(2.39) * kp; kp *= 1.22; }
    v = sin(kp.x * 1.45 - t * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.45), cos(time * 0.98)) * 0.11;
	float an = atan(p.y, p.x) + time * 0.30;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.12 / 3.1415927, 0.43 / r + time * 1.54);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.40, 0.32), vec3(0.59, 0.74, 0.67), cc);
	col *= clamp(r * 1.85, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
