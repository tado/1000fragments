uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.71, t * 1.25 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	p = fract(p * 2.53) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.10, vec3(0.47, 0.42, 0.41), vec3(0.38, 0.49, 0.40), vec3(1.10, 0.87, 1.09), vec3(0.92, 0.61, 0.92));
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
