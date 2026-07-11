uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.32 * pow(abs(cos(ra * 2.0 + t * 1.62)), 1.12);
    v = sin((rr - pet) * 17.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	p = rot2(time * 1.42) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.38; p = rot2(1.78) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.98, lr * 2.54 + time * -0.72); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.27, vec3(0.41, 0.58, 0.59), vec3(0.45, 0.44, 0.48), vec3(0.75, 1.32, 1.04), vec3(0.43, 0.08, 0.14));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
