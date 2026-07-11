uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.53 + 0.25 * cos(sa * 5.0 + t * 2.68 + ph);
    v = sin((sr - petal) * 14.37);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.13;
	p = rot2(p.y * 1.02 + time * 1.03) * p;
	p += vec2(0.40, -0.25) * sin(length(p) * 5.57 - time * 2.26) * 0.17;
	{ float fr = length(p); p *= 1.0 + -0.78 * fr * fr; }
	p = rot2(time * 0.79) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.20, vec3(0.55, 0.43, 0.49), vec3(0.46, 0.46, 0.33), vec3(1.03, 1.33, 0.85), vec3(0.08, 0.86, 0.61));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
