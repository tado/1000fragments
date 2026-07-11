uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.21 * cos(sa * 5.0 + t * 2.94 + ph);
    v = sin((sr - petal) * 13.75);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.14, vec3(0.45, 0.58, 0.56), vec3(0.34, 0.47, 0.32), vec3(0.78, 1.20, 1.05), vec3(0.16, 0.62, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
