uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.62, t * 0.73 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	p *= 1.58;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.02, vec3(0.58, 0.53, 0.60), vec3(0.44, 0.48, 0.44), vec3(0.91, 0.89, 1.33), vec3(0.47, 0.68, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
