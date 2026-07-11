uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.40, t * 0.67 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 31.10 - t * 2.97 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 35.57 - t * 2.97 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.66 + time * 0.16, vec3(0.59, 0.45, 0.46), vec3(0.40, 0.47, 0.45), vec3(1.07, 1.22, 0.88), vec3(0.93, 0.33, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
