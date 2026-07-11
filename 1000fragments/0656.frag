uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.71 + t * 2.57 + ph) + sin(p.y * 13.01 - t * 3.74 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.18 + t * 2.60 + ph) + sin(p.y * 2.22 - t * 4.44 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	p += vec2(-0.03, -0.46) * sin(length(p) * 2.14 - time * 1.36) * 0.14;
	p *= 1.52;
	p = abs(p) - 0.68;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.75);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.60 + time * 0.05, vec3(0.48, 0.41, 0.44), vec3(0.41, 0.46, 0.38), vec3(1.11, 1.14, 0.74), vec3(0.16, 0.88, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
