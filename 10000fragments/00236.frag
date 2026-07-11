uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.17 - t * 2.34 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.36 + t * 4.58 + ph) + sin(p.y * 4.34 - t * 0.72 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.04 + time * 0.11, vec3(0.56, 0.59, 0.42), vec3(0.46, 0.48, 0.47), vec3(1.13, 1.20, 0.93), vec3(0.39, 0.60, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
