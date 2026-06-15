uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.06 + t * 2.16 + ph) + sin(p.y * 6.75 - t * 2.16 + ph)
        + sin((p.x + p.y) * 11.26 + t * 2.16 + ph) + sin(length(p) * 6.44 - t * 2.16 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.21, vec3(0.57, 0.49, 0.43), vec3(0.45, 0.33, 0.35), vec3(0.75, 0.80, 1.32), vec3(0.94, 0.57, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
