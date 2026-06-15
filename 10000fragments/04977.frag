uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.02 + t * 2.71 + ph) + sin(p.y * 8.70 - t * 2.71 + ph)
        + sin((p.x + p.y) * 4.42 + t * 2.71 + ph) + sin(length(p) * 17.98 - t * 2.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.16, vec3(0.42, 0.47, 0.45), vec3(0.37, 0.42, 0.41), vec3(0.80, 1.02, 1.20), vec3(0.97, 0.54, 0.84));
	col = clamp((col - 0.5) * 1.68 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
