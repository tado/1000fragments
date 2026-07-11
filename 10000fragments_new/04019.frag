uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.95 + t * 4.02 + ph) + sin(p.y * 15.05 - t * 1.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	p = fract(p * 1.97) - 0.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.37; p = rot2(2.45) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.47, lr * 1.77 + time * -0.64); }
	p = rot2(length(p) * -3.44 + time * 0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.18, vec3(0.45, 0.58, 0.50), vec3(0.50, 0.47, 0.40), vec3(0.93, 0.92, 1.29), vec3(0.77, 0.23, 0.26));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
