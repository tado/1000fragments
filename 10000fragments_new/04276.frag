uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.27 * cos(sa * 6.0 + t * 0.79 + ph);
    v = sin((sr - petal) * 18.69);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 2.32 + time * 1.86) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.29, vec3(0.51, 0.59, 0.57), vec3(0.31, 0.41, 0.48), vec3(1.26, 1.39, 1.36), vec3(0.01, 0.74, 0.62));
	col = fract(col * 1.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
