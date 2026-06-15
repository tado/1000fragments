uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.77 + t * 2.21 + ph) + sin(p.y * 6.74 - t * 2.21 + ph)
        + sin((p.x + p.y) * 4.99 + t * 2.21 + ph) + sin(length(p) * 9.83 - t * 2.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.25, vec3(0.60, 0.52, 0.59), vec3(0.45, 0.37, 0.44), vec3(1.03, 1.34, 1.27), vec3(0.95, 0.03, 0.26));
	col = clamp((col - 0.5) * 1.70 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
