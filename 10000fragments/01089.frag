uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.69 + t * 2.10 + ph) + sin(p.y * 9.77 - t * 2.10 + ph)
        + sin((p.x + p.y) * 3.68 + t * 2.10 + ph) + sin(length(p) * 3.77 - t * 2.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	p = fract(p * 2.91) - 0.5;
	p += vec2(-0.23, 0.02) * sin(length(p) * 3.21 - time * 1.16) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.17, vec3(0.50, 0.42, 0.49), vec3(0.36, 0.41, 0.50), vec3(0.78, 0.94, 1.06), vec3(0.49, 0.16, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
