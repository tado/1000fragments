uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.12 + t * 5.72 + ph) + sin(p.y * 6.47 - t * 5.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	p *= 1.25;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.20, vec3(0.54, 0.55, 0.47), vec3(0.44, 0.40, 0.34), vec3(1.27, 0.80, 0.71), vec3(0.88, 0.59, 0.27));
	col = clamp((col - 0.5) * 1.23 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
