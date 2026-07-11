uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.91, t * 1.59 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.09, vec3(0.46, 0.56, 0.57), vec3(0.41, 0.34, 0.33), vec3(0.89, 1.12, 1.15), vec3(0.76, 0.22, 0.10));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
