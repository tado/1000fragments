uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.99 + t * 0.79 + ph) + sin(p.y * 3.90 - t * 0.79 + ph)
        + sin((p.x + p.y) * 5.01 + t * 0.79 + ph) + sin(length(p) * 11.83 - t * 0.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.95;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.13, vec3(0.43, 0.46, 0.44), vec3(0.32, 0.42, 0.38), vec3(1.04, 0.82, 0.96), vec3(0.36, 0.87, 0.07));
	col = clamp((col - 0.5) * 1.86 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
