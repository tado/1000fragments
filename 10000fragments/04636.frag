uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 23.29 - t * 1.17 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 9.78 - t * 1.17 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p += vec2(0.05, 0.14) * sin(length(p) * 5.19 - time * 0.50) * 0.19;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.18, lr * 2.47 + time * 0.31); }
	p = fract(p * 2.67) - 0.5;
	p = rot2(length(p) * -2.63 + time * 1.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.30 + time * 0.05);
	col = fract(col * 1.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
