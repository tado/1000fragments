uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.59 + t * 1.56 + ph) + sin(p.y * 12.08 - t * 1.88 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.45 + sin(p.y * 4.67 + t * 4.00) * 3.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.78);
	float d = d1 * d2;
	vec3 col = palette(d * 0.73 + time * 0.25, vec3(0.41, 0.56, 0.41), vec3(0.49, 0.38, 0.33), vec3(1.27, 0.98, 1.12), vec3(0.83, 0.95, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
