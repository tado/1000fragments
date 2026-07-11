uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.84, t * 0.35 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 2.00 + time * 0.06, vec3(0.47, 0.49, 0.42), vec3(0.36, 0.32, 0.45), vec3(0.72, 0.99, 0.91), vec3(0.50, 0.28, 0.21));
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
