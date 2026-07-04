uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.78;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.57; kp = rot2(0.95) * kp; kp *= 1.42; }
    v = sin(kp.x * 3.11 - t * 1.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.61), cos(time * 0.42)) * 0.25;
	float an = atan(p.y, p.x) + time * -0.67;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.14 / 3.1415927, 0.99 / r - time * 1.01);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.23, 0.15, 0.33) * (0.18 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.68, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
