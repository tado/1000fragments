uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.80, t * 0.74 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 27.17 - t * 7.15 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 39.78 - t * 7.15 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.57;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = d1 * d2;
	vec3 col = palette(d * 1.08 + time * 0.06, vec3(0.48, 0.45, 0.46), vec3(0.46, 0.35, 0.30), vec3(1.13, 0.84, 0.77), vec3(0.59, 0.95, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
