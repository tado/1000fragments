uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.69, t * 0.78 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.22, vec3(0.44, 0.52, 0.44), vec3(0.49, 0.42, 0.36), vec3(1.29, 1.00, 1.35), vec3(0.70, 0.47, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
