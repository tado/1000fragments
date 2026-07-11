uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.18 * cos(sa * 8 + t * 2.04 + ph);
    v = sin((sr - petal) * 9.08);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.25, -0.57) * sin(length(p) * 4.95 - time * 0.77) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.01, vec3(0.48, 0.49, 0.49), vec3(0.36, 0.48, 0.31), vec3(0.79, 1.18, 0.85), vec3(0.17, 0.51, 0.57));
	col = fract(col * 2.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
