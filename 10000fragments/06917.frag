uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.03, t * 2.30 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.57;
	p += vec2(0.76, -0.00) * sin(length(p) * 4.00 - time * 0.87) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.24, vec3(0.53, 0.52, 0.46), vec3(0.30, 0.33, 0.44), vec3(0.94, 1.06, 1.39), vec3(0.00, 0.80, 0.04));
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
