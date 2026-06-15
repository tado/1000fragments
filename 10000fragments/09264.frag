uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.38, t * 1.24 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 32.45 - t * 5.66 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 25.24 - t * 5.66 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = d1 + d2;
	vec3 col = palette(d * 0.65 + time * 0.08, vec3(0.51, 0.49, 0.49), vec3(0.46, 0.30, 0.42), vec3(0.86, 0.88, 1.04), vec3(0.22, 0.04, 0.07));
	col = mod(col * 2.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
