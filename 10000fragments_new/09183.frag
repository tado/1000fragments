uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.48;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.61; kp = rot2(0.62) * kp; kp *= 1.23; }
    v = sin(kp.x * 1.77 - t * 1.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.32;
	p += vec2(-0.82, 0.80) * sin(length(p) * 5.91 - time * 2.19) * 0.21;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.09 + time * -0.73); }
	p = rot2(length(p) * -2.79 + time * 1.33) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.60, 0.94, 0.52) + vec3(0.16, 0.09, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
