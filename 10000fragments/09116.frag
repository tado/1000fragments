uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 31.36 - t * 3.21 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 32.20 - t * 3.21 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.20, t * 0.60 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.76);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.69 + time * 0.27, vec3(0.47, 0.48, 0.44), vec3(0.50, 0.37, 0.38), vec3(0.86, 0.71, 0.88), vec3(0.58, 0.17, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
