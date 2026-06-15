uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.54, t * 1.35 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.76 + t * 0.75 + ph) + sin(p.y * 9.16 - t * 0.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	p = fract(p * 2.37) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = d1 * d2;
	vec3 col = palette(d * 0.66 + time * 0.16, vec3(0.57, 0.51, 0.51), vec3(0.30, 0.43, 0.38), vec3(1.10, 1.26, 0.75), vec3(0.12, 0.34, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
