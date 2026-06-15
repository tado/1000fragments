uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.24 + sr * 17.98 - t * 1.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.45; p = rot2(1.86) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.56, lr * 2.89 + time * 0.65); }
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.66 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
