uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.66 + t * 2.43 + ph) + sin(p.y * 6.87 - t * 2.43 + ph)
        + sin((p.x + p.y) * 10.69 + t * 2.43 + ph) + sin(length(p) * 8.45 - t * 2.43 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.29, vec3(0.58, 0.50, 0.51), vec3(0.35, 0.34, 0.37), vec3(0.78, 1.20, 0.86), vec3(0.98, 0.74, 0.21));
	col = mod(col * 2.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
