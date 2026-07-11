uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.30;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.65; kp = rot2(2.43) * kp; kp *= 1.21; }
    v = sin(kp.y * 2.71 - t * 4.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.37, lr * 1.59 + time * -0.67); }
	p += vec2(0.96, -0.95) * sin(length(p) * 2.66 - time * 1.60) * 0.20;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.04 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
