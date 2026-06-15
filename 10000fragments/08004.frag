uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.23 + sin(p.y * 1.48 + t * 1.99) * 4.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.15, vec3(0.58, 0.58, 0.58), vec3(0.36, 0.32, 0.39), vec3(1.37, 1.07, 0.79), vec3(0.09, 0.51, 0.82));
	col = clamp((col - 0.5) * 1.71 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
