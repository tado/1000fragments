uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.79, t * 0.41 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.05, lr * 2.26 + time * -0.78); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.19, vec3(0.50, 0.56, 0.52), vec3(0.49, 0.44, 0.42), vec3(1.33, 1.24, 1.09), vec3(0.65, 0.60, 0.26));
	col = mod(col * 1.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
