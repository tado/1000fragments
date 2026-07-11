uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.26 * cos(sa * 9.0 + t * 0.62 + ph);
    v = sin((sr - petal) * 9.61);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.51, -0.04) * sin(length(p) * 5.45 - time * 2.27) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.09, vec3(0.42, 0.58, 0.44), vec3(0.46, 0.31, 0.39), vec3(1.17, 1.13, 1.34), vec3(0.30, 0.36, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
