uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.57 - t * 3.81 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.14 * cos(sa * 3 + t * 1.95 + ph);
    v = sin((sr - petal) * 19.23);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 2.00);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.23, vec3(0.56, 0.54, 0.49), vec3(0.46, 0.30, 0.36), vec3(0.83, 0.96, 0.70), vec3(0.72, 0.43, 0.54));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
