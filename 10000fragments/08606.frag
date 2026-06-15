uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 22.08 - t * 2.35 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 22.71 - t * 2.35 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.01, lr * 2.53 + time * 0.60); }
	p = rot2(0.59) * p;
	p *= 2.03;
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.26 + time * 0.29);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
