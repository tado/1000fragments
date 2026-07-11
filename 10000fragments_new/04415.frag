uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.27;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.77; kp = rot2(1.64) * kp; kp *= 1.30; }
    v = sin(kp.y * 2.05 - t * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.45), cos(time * 0.72)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.12;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.12 / 3.1415927, 0.64 / r - time * 0.59);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.73, 0.25, 0.78) * (0.22 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.90, 0.0, 1.0);
	col = fract(col * 2.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
