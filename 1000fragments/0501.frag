uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.83 + t * 2.11 + ph) + sin(p.y * 3.48 - t * 1.36 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	p *= 1.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.13, vec3(0.47, 0.42, 0.48), vec3(0.45, 0.42, 0.45), vec3(1.28, 1.08, 1.28), vec3(0.26, 0.34, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
