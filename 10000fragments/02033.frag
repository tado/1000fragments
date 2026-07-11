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
    v = sin(sa * 10.89 + sr * 4.84 - t * 1.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	p = rot2(1.93) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.54; p = rot2(1.29) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.79, lr * 2.66 + time * -0.57); }
	p = rot2(length(p) * 2.25 + time * 0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.05, vec3(0.52, 0.51, 0.43), vec3(0.40, 0.48, 0.48), vec3(1.20, 0.76, 0.83), vec3(0.00, 0.71, 0.34));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
