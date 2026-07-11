uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.17;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.53; kp = rot2(0.77) * kp; kp *= 1.30; }
    v = sin(kp.y * 2.94 - t * 3.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.08), cos(time * 0.70)) * 0.05;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.28 / 3.1415927, 0.56 / r - time * 2.21);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.40, 0.46, 0.32) * (0.09 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 2.21, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
