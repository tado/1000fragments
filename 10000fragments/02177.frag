uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.29 + sr * 4.71 - t * 0.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.53;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.07, vec3(0.52, 0.47, 0.48), vec3(0.45, 0.32, 0.31), vec3(1.34, 1.11, 1.30), vec3(0.23, 0.05, 0.46));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
