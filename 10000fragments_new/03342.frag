uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.26 * cos(sa * 5.0 + t * 2.66 + ph);
    v = sin((sr - petal) * 7.25);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.27) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.38 * fr * fr; }
	p.y += sin(p.x * 2.72 + time * 1.01) * 0.39;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.24, vec3(0.52, 0.55, 0.54), vec3(0.39, 0.41, 0.43), vec3(1.08, 0.88, 0.88), vec3(0.41, 0.90, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
