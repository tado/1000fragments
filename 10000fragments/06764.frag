uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.79, t * 0.44 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.96;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.30, vec3(0.55, 0.46, 0.44), vec3(0.49, 0.45, 0.36), vec3(0.76, 0.82, 0.87), vec3(0.35, 0.87, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
