uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.48;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.51; kp = rot2(2.37) * kp; kp *= 1.21; }
    v = sin(kp.y * 2.15 - t * 3.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	p = fract(p * 1.26) - 0.5;
	p += vec2(0.65, -0.62) * sin(length(p) * 5.27 - time * 1.88) * 0.16;
	p = (floor(p * 15.3) + 0.5) / 15.3;
	p.y += sin(p.x * 4.03 + time * 2.11) * 0.21;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.72));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
