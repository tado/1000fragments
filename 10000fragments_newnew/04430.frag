uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.44 + t * 2.80 + ph) + sin(p.y * 8.93 - t * 2.80 + ph)
        + sin((p.x + p.y) * 6.94 + t * 2.80 + ph) + sin(length(p) * 17.56 - t * 2.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	p = sin(p * 2.48 + time * 1.86) * 0.71;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.20, vec3(0.57, 0.42, 0.44), vec3(0.34, 0.42, 0.35), vec3(1.29, 1.11, 0.79), vec3(0.61, 0.54, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
