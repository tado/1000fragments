uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.21 + sin(p.y * 3.70 + t * 3.02) * 4.43 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.53 + t * 2.56 + ph) + sin(p.y * 12.54 - t * 1.46 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.93);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.61 + time * 0.24, vec3(0.45, 0.48, 0.42), vec3(0.45, 0.39, 0.43), vec3(0.98, 1.08, 1.19), vec3(0.67, 0.74, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
