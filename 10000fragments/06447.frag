uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.80 + sin(p.y * 5.21 + t * 2.27) * 2.69 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.04 + sin(p.y * 2.29 + t * 2.35) * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.58;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.39 + time * 0.27, vec3(0.59, 0.40, 0.47), vec3(0.46, 0.44, 0.42), vec3(1.22, 1.23, 0.80), vec3(0.45, 0.07, 0.29));
	col = mod(col * 2.07, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
