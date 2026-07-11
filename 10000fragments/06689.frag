uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.72, t * 1.24 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	p += vec2(-0.47, 0.63) * sin(length(p) * 4.24 - time * 0.63) * 0.14;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.56, lr * 2.29 + time * 0.50); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.13, vec3(0.57, 0.46, 0.52), vec3(0.46, 0.31, 0.36), vec3(0.70, 1.00, 1.27), vec3(0.78, 0.25, 0.92));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
