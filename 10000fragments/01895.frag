uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.56 - t * 8.43 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.07 - t * 4.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.78 + time * 0.14, vec3(0.44, 0.47, 0.43), vec3(0.49, 0.42, 0.49), vec3(0.91, 1.37, 0.84), vec3(0.96, 0.74, 0.30));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
