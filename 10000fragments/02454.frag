uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.25, t * 1.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.50) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 2.41 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = d1 * d2;
	vec3 col = palette(d * 0.68 + time * 0.21, vec3(0.46, 0.46, 0.43), vec3(0.42, 0.37, 0.45), vec3(1.11, 1.33, 0.75), vec3(0.52, 0.19, 0.98));
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
