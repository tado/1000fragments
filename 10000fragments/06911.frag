uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.12, t * 1.87 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.05, vec3(0.45, 0.55, 0.43), vec3(0.48, 0.50, 0.40), vec3(0.98, 1.25, 1.09), vec3(0.70, 0.88, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
