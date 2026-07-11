uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.43;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.61; kp = rot2(2.75) * kp; kp *= 1.24; }
    v = sin(kp.y * 3.97 - t * 1.21 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.56, -0.34) * sin(length(p) * 5.71 - time * 0.81) * 0.31;
	p = rot2(time * 1.41) * p;
	p.y += sin(p.x * 2.51 + time * 3.08) * 0.28;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.18), field(p, time, 2.36));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
