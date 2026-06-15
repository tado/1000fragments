uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.85 + t * 2.32 + ph) + sin(p.y * 5.56 - t * 5.66 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.26, vec3(0.51, 0.43, 0.53), vec3(0.39, 0.50, 0.40), vec3(0.98, 1.36, 1.32), vec3(0.69, 0.98, 0.98));
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
