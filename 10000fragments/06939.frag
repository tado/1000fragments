uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.10, t * 2.08 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.00, vec3(0.49, 0.60, 0.55), vec3(0.31, 0.39, 0.34), vec3(0.94, 1.02, 0.76), vec3(0.92, 0.28, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
