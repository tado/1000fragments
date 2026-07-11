uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.19 * cos(sa * 3 + t * 2.76 + ph);
    v = sin((sr - petal) * 11.36);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.01, vec3(0.47, 0.54, 0.45), vec3(0.31, 0.46, 0.34), vec3(1.15, 0.96, 1.21), vec3(0.18, 0.15, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
