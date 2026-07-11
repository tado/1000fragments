uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.72 + t * 4.45 + ph) + sin(p.y * 7.74 - t * 4.45 + ph)
        + sin((p.x + p.y) * 10.97 + t * 4.45 + ph) + sin(length(p) * 5.05 - t * 4.45 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.16;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.22, vec3(0.59, 0.48, 0.43), vec3(0.48, 0.48, 0.45), vec3(0.92, 1.21, 1.06), vec3(0.86, 0.25, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
