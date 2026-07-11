uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.21 * cos(sa * 9 + t * 2.88 + ph);
    v = sin((sr - petal) * 18.00);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	{ float fr = length(p); p *= 1.0 + -0.51 * fr * fr; }
	p += vec2(-0.52, -0.64) * sin(length(p) * 3.58 - time * 1.04) * 0.35;
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.21, vec3(0.43, 0.52, 0.43), vec3(0.40, 0.30, 0.32), vec3(1.05, 1.23, 0.72), vec3(0.95, 0.58, 0.54));
	col = fract(col * 1.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
