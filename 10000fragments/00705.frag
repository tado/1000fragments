uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.18 * cos(sa * 6 + t * 0.41 + ph);
    v = sin((sr - petal) * 13.13);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	p = abs(p) - 0.24;
	p += vec2(0.64, 0.29) * sin(length(p) * 5.65 - time * 1.61) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.14, vec3(0.41, 0.50, 0.58), vec3(0.48, 0.48, 0.34), vec3(1.15, 1.14, 1.38), vec3(0.71, 0.25, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
