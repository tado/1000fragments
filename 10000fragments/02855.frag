uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.19 * cos(sa * 9 + t * 1.71 + ph);
    v = sin((sr - petal) * 9.57);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.63, lr * 2.12 + time * 0.56); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.04, vec3(0.43, 0.53, 0.46), vec3(0.37, 0.46, 0.33), vec3(1.14, 1.26, 0.86), vec3(0.85, 0.66, 0.99));
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
