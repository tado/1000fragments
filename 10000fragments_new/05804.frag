uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.95 + t * 2.89 + ph) + sin(p.y * 7.82 - t * 2.89 + ph)
        + sin((p.x + p.y) * 5.87 + t * 2.89 + ph) + sin(length(p) * 17.11 - t * 2.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.21, vec3(0.43, 0.57, 0.59), vec3(0.50, 0.42, 0.32), vec3(1.07, 1.26, 1.08), vec3(0.97, 0.84, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
