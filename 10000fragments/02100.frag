uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.05 + sr * 8.96 - t * 4.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	p = abs(p) - 0.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.17, vec3(0.43, 0.42, 0.59), vec3(0.31, 0.33, 0.31), vec3(1.27, 1.38, 1.33), vec3(0.28, 0.24, 0.42));
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
