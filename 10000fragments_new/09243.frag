uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.11;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.75; kp = rot2(1.40) * kp; kp *= 1.42; }
    v = sin(kp.x * 2.02 - t * 2.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.87;
	p = (floor(p * 26.3) + 0.5) / 26.3;
	p.x += sin(p.y * 2.25 + time * 2.24) * 0.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.13, lr * 1.11 + time * 0.61); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.17, 0.17, 0.89) * (0.21 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
