uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.92 + sr * 16.01 - t * 4.03 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.65, t * 2.44 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.45 + time * 0.29, vec3(0.58, 0.42, 0.48), vec3(0.45, 0.50, 0.43), vec3(0.88, 1.17, 1.16), vec3(0.66, 0.11, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
