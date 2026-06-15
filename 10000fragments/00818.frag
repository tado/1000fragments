uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.02 + sin(p.y * 4.00 + t * 5.43) * 1.63 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.03, lr * 1.52 + time * 0.52); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(0.95) * p; }
	p = fract(p * 1.06) - 0.5;
	p += vec2(-0.40, -0.22) * sin(length(p) * 2.68 - time * 0.52) * 0.13;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.01, vec3(0.54, 0.55, 0.56), vec3(0.48, 0.43, 0.48), vec3(1.15, 1.03, 1.02), vec3(0.07, 0.33, 0.52));
	col = mod(col * 1.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
