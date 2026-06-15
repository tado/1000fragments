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
    v = sin(sa * 7.30 + sr * 20.39 - t * 1.27 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 39.51 - t * 5.10 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 15.37 - t * 5.10 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	{ p = vec2(atan(p.y, p.x) * 2.17, length(p) * 4.44 - time * 0.57); }
	p = fract(p * 2.49) - 0.5;
	p = rot2(time * 0.77) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.62, lr * 1.91 + time * -0.79); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.78);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.86 + time * 0.08, vec3(0.54, 0.59, 0.54), vec3(0.42, 0.38, 0.44), vec3(0.86, 0.96, 1.18), vec3(0.27, 0.83, 0.32));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
