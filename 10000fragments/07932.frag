uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.35 + sr * 10.70 - t * 4.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.10, lr * 2.44 + time * 0.19); }
	p = fract(p * 2.74) - 0.5;
	p = rot2(time * 0.41) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.38; p = rot2(0.42) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.16, vec3(0.49, 0.56, 0.56), vec3(0.45, 0.43, 0.44), vec3(1.29, 1.04, 0.93), vec3(0.15, 0.50, 0.40));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
