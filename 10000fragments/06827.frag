uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.38, t * 1.91 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.71 - t * 2.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.08 + time * 0.19, vec3(0.42, 0.40, 0.53), vec3(0.49, 0.35, 0.38), vec3(0.82, 1.07, 0.89), vec3(0.25, 0.74, 0.56));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
