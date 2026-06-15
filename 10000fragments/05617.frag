uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.93 + t * 4.04 + ph) + sin(p.y * 3.31 - t * 4.04 + ph)
        + sin((p.x + p.y) * 11.62 + t * 4.04 + ph) + sin(length(p) * 11.89 - t * 4.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	p = rot2(length(p) * -2.31 + time * 0.54) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.54; p = rot2(1.69) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 1.31 + time * 0.41); }
	p = fract(p * 2.08) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.28, vec3(0.58, 0.56, 0.60), vec3(0.43, 0.45, 0.47), vec3(1.03, 1.21, 1.23), vec3(0.96, 0.75, 0.06));
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
