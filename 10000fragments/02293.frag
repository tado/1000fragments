uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.21 * cos(sa * 4 + t * 1.01 + ph);
    v = sin((sr - petal) * 16.23);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.88;
	p += vec2(-0.94, -1.00) * sin(length(p) * 5.24 - time * 1.94) * 0.25;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.24, vec3(0.59, 0.54, 0.60), vec3(0.37, 0.39, 0.41), vec3(1.23, 1.34, 1.05), vec3(0.57, 0.65, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
