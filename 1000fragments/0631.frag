uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.28 - t * 5.68 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.22 - t * 4.62 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.04 + time * 0.25, vec3(0.58, 0.44, 0.42), vec3(0.50, 0.42, 0.45), vec3(0.99, 1.38, 1.28), vec3(0.30, 0.84, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
