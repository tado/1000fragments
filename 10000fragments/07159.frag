uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.32, t * 1.27 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.81, lr * 1.09 + time * 0.29); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.57, length(p) * 2.78 - time * 0.52); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.28, vec3(0.45, 0.41, 0.55), vec3(0.35, 0.48, 0.43), vec3(1.23, 0.89, 1.31), vec3(0.21, 0.25, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
