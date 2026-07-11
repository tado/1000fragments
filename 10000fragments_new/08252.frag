uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.01;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.45; kp = rot2(2.01) * kp; kp *= 1.30; }
    v = sin(kp.y * 2.32 - t * 3.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	p = (floor(p * 9.0) + 0.5) / 9.0;
	p = abs(p) - 0.20;
	{ p = vec2(atan(p.y, p.x) * 2.06, length(p) * 4.94 - time * 0.24); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.48, 0.31, 0.64) * (0.19 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
