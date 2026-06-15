uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.03 + sr * 12.81 - t * 2.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	p = abs(p) - 0.70;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.22, vec3(0.55, 0.52, 0.45), vec3(0.49, 0.35, 0.49), vec3(1.11, 1.20, 1.05), vec3(0.52, 0.16, 0.39));
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
