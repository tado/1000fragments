uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.21 * cos(sa * 3 + t * 0.89 + ph);
    v = sin((sr - petal) * 18.47);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.21, vec3(0.55, 0.45, 0.52), vec3(0.43, 0.36, 0.41), vec3(1.12, 0.94, 0.74), vec3(0.41, 0.39, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
