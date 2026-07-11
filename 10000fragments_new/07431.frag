uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.06;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.68; kp = rot2(2.59) * kp; kp *= 1.33; }
    v = sin(kp.y * 3.15 - t * 3.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.76;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.59, lr * 1.57 + time * -0.30); }
	p = abs(p) - 0.74;
	p *= 2.61;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.50 + time * 0.26);
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
