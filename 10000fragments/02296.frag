uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.26 * cos(sa * 8 + t * 2.68 + ph);
    v = sin((sr - petal) * 18.23);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.01 + sin(p.y * 1.79 + t * 3.16) * 4.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.49 + time * 0.04, vec3(0.46, 0.41, 0.44), vec3(0.39, 0.46, 0.40), vec3(1.18, 1.31, 0.86), vec3(0.02, 0.07, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
