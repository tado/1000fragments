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
    v = sin(sa * 9.71 + sr * 4.47 - t * 3.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.26; p = rot2(1.05) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.45, lr * 2.85 + time * -0.76); }
	{ p = vec2(atan(p.y, p.x) * 2.00, length(p) * 2.83 - time * 0.71); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.03, vec3(0.52, 0.57, 0.58), vec3(0.45, 0.34, 0.39), vec3(1.21, 1.07, 0.94), vec3(0.23, 1.00, 0.53));
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
