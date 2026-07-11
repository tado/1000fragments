uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.29 * cos(sa * 7 + t * 2.85 + ph);
    v = sin((sr - petal) * 17.23);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.09) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.78, lr * 1.42 + time * 0.23); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.31; p = rot2(1.31) * p; }
	p *= 2.55;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.89));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
