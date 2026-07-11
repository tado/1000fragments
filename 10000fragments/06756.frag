uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.97, t * 1.39 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.65;
	{ float fr = length(p); p *= 1.0 + 0.56 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.16, vec3(0.53, 0.46, 0.49), vec3(0.30, 0.35, 0.39), vec3(1.23, 0.81, 0.88), vec3(0.01, 0.67, 0.60));
	col = mod(col * 2.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
