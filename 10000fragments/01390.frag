uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.11, t * 2.17 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.31 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 2.44 + time * 0.27); }
	p += vec2(-0.74, 0.22) * sin(length(p) * 5.76 - time * 1.56) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.18, vec3(0.51, 0.54, 0.56), vec3(0.37, 0.32, 0.38), vec3(0.95, 1.24, 1.34), vec3(0.81, 0.42, 0.29));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
