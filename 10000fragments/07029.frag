uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.95, t * 1.90 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.90 - t * 4.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.72);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.66 + time * 0.18, vec3(0.58, 0.59, 0.42), vec3(0.41, 0.32, 0.41), vec3(0.78, 1.22, 0.83), vec3(0.20, 0.53, 0.52));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
