uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.17 + t * 5.69 + ph) + sin(p.y * 3.67 - t * 1.04 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.75 + sin(p.y * 3.10 + t * 4.24) * 3.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.53 + time * 0.13, vec3(0.60, 0.60, 0.46), vec3(0.44, 0.31, 0.40), vec3(1.37, 0.81, 0.86), vec3(0.85, 0.39, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
