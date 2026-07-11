uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.97 + t * 2.18 + ph) + sin(p.y * 3.28 - t * 5.28 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.28, vec3(0.41, 0.46, 0.41), vec3(0.47, 0.38, 0.40), vec3(0.80, 1.40, 1.38), vec3(0.66, 0.29, 0.99));
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
