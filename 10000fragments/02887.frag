uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.39;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.74; kp = rot2(1.90) * kp; kp *= 1.31; }
    v = sin(kp.x * 1.68 - t * 4.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.32 / 3.1415927, 0.34 / r + time * 1.41);
	tv.x += tv.y * 0.13;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.20, 0.36), vec3(0.81, 0.73, 0.44), cc);
	col *= clamp(r * 2.91, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
