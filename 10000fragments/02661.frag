uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.26 * cos(sa * 5 + t * 2.66 + ph);
    v = sin((sr - petal) * 7.62);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	{ p = vec2(atan(p.y, p.x) * 1.13, length(p) * 5.50 - time * 0.73); }
	p = abs(p) - 0.71;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.70) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.27, vec3(0.45, 0.56, 0.54), vec3(0.39, 0.48, 0.47), vec3(1.00, 1.03, 0.89), vec3(0.73, 0.63, 0.39));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
