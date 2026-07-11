uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.92 + t * 3.83 + ph) + sin(p.y * 8.99 - t * 3.83 + ph)
        + sin((p.x + p.y) * 6.11 + t * 3.83 + ph) + sin(length(p) * 14.17 - t * 3.83 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.01, vec3(0.55, 0.44, 0.51), vec3(0.30, 0.50, 0.36), vec3(0.90, 1.38, 1.09), vec3(0.12, 0.65, 0.54));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
