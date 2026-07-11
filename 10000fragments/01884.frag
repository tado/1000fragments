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
    v = sin(sa * 6.77 + sr * 14.07 - t * 3.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.87;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.48, lr * 2.65 + time * -0.56); }
	p = rot2(2.95) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.50 + time * 0.09, vec3(0.58, 0.51, 0.54), vec3(0.41, 0.39, 0.45), vec3(1.04, 0.84, 1.11), vec3(0.94, 0.79, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
