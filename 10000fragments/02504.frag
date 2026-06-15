uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.18 + t * 3.72 + ph) + sin(p.y * 6.93 - t * 3.72 + ph)
        + sin((p.x + p.y) * 11.27 + t * 3.72 + ph) + sin(length(p) * 8.21 - t * 3.72 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.20, vec3(0.48, 0.51, 0.47), vec3(0.40, 0.39, 0.47), vec3(1.20, 1.37, 1.00), vec3(0.28, 0.36, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
