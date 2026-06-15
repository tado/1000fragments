uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.88 + t * 1.60 + ph) + sin(p.y * 10.88 - t * 5.65 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.17 * cos(sa * 3 + t * 2.87 + ph);
    v = sin((sr - petal) * 13.83);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.34);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.74 + time * 0.15, vec3(0.56, 0.40, 0.56), vec3(0.35, 0.43, 0.36), vec3(0.91, 0.75, 1.01), vec3(0.64, 0.73, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
