uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.62 + vec2(t * 2.17, -t * 2.17) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.19 * cos(sa * 4 + t * 0.42 + ph);
    v = sin((sr - petal) * 12.05);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.75);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.25 + time * 0.09, vec3(0.53, 0.49, 0.44), vec3(0.31, 0.44, 0.49), vec3(1.16, 1.04, 1.36), vec3(0.08, 0.19, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
