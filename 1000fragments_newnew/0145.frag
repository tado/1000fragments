uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.20;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.54; kp = rot2(2.10) * kp; kp *= 1.20; }
    v = sin(kp.x * 1.27 - t * 4.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.77) * 0.44), cos((time * 0.77) * 0.51)) * 0.12;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.17 / 3.1415927, 0.47 / r + (time * 0.77) * 0.55);
	float d = field(tv, (time * 0.77), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.11, 0.02), vec3(0.80, 0.81, 0.70), cc);
	col *= clamp(r * 2.06, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.918, 0.980, 1.046) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
