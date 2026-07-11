uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.13 + t * 4.57 + ph) + sin(p.y * 13.05 - t * 4.57 + ph)
        + sin((p.x + p.y) * 4.18 + t * 4.57 + ph) + sin(length(p) * 13.09 - t * 4.57 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.56, t * 0.79 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.60);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.34 + time * 0.27, vec3(0.41, 0.60, 0.55), vec3(0.31, 0.44, 0.37), vec3(1.40, 0.77, 1.07), vec3(0.17, 0.57, 0.48));
	col = mod(col * 2.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
