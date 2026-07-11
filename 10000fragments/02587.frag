uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.20 * cos(sa * 5 + t * 2.80 + ph);
    v = sin((sr - petal) * 11.65);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	p += vec2(-0.15, -0.03) * sin(length(p) * 2.01 - time * 1.60) * 0.21;
	p = rot2(time * 0.82) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.22; p = rot2(1.50) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 1.14 + time * -0.57); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.13, 0.54), vec3(0.76, 0.67, 0.71), d);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
