uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.27 * cos(sa * 4 + t * 0.82 + ph);
    v = sin((sr - petal) * 16.15);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.94, length(p) * 5.31 - time * 0.69); }
	p += vec2(-0.07, -0.29) * sin(length(p) * 3.10 - time * 1.12) * 0.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.11, vec3(0.56, 0.59, 0.47), vec3(0.36, 0.42, 0.49), vec3(1.40, 1.31, 1.19), vec3(0.14, 0.58, 0.05));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
