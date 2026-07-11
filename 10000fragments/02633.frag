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
    float petal = 0.55 + 0.28 * cos(sa * 5 + t * 0.64 + ph);
    v = sin((sr - petal) * 8.01);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	p = rot2(time * 1.39) * p;
	p += vec2(0.18, -0.90) * sin(length(p) * 5.01 - time * 1.24) * 0.30;
	p = rot2(length(p) * -1.30 + time * 0.63) * p;
	{ float fr = length(p); p *= 1.0 + 0.53 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 2.00 + time * 0.05, vec3(0.54, 0.46, 0.52), vec3(0.38, 0.33, 0.33), vec3(0.75, 0.92, 1.26), vec3(0.17, 0.91, 0.44));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
