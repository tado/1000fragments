uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.26 * cos(sa * 9 + t * 2.80 + ph);
    v = sin((sr - petal) * 19.41);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.00;
	p += vec2(0.13, 0.85) * sin(length(p) * 3.55 - time * 0.53) * 0.29;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.16, vec3(0.51, 0.56, 0.40), vec3(0.43, 0.33, 0.33), vec3(1.04, 1.40, 1.23), vec3(0.41, 0.41, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
