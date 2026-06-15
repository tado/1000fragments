uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.24 * cos(sa * 8 + t * 2.58 + ph);
    v = sin((sr - petal) * 12.95);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.29, lr * 1.53 + time * -0.31); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.51, 1.19, 1.14) + vec3(0.17, 0.17, 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
