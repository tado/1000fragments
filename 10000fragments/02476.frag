uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.13 * cos(sa * 9 + t * 1.68 + ph);
    v = sin((sr - petal) * 14.86);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.03, -0.70) * sin(length(p) * 5.64 - time * 1.14) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.29, 0.62, 0.88) + vec3(0.05, 0.24, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
