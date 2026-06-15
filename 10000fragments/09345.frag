uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.16 * cos(sa * 3 + t * 1.30 + ph);
    v = sin((sr - petal) * 9.28);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.10, vec3(0.41, 0.49, 0.41), vec3(0.45, 0.45, 0.31), vec3(0.83, 0.92, 1.05), vec3(0.04, 0.52, 0.26));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
