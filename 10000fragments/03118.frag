uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.26 + vec2(t * 0.38, -t * 0.38) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.53, length(p) * 4.57 - time * 0.21); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.14, lr * 2.38 + time * -0.38); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.07, vec3(0.50, 0.56, 0.53), vec3(0.33, 0.39, 0.48), vec3(0.76, 0.77, 1.23), vec3(0.78, 0.19, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
