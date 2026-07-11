uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.14 + sin(p.y * 5.49 + t * 2.85) * 2.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.26 - t * 6.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.09;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.67 + time * 0.01, vec3(0.53, 0.52, 0.50), vec3(0.44, 0.38, 0.47), vec3(1.20, 0.75, 0.87), vec3(0.94, 0.71, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
