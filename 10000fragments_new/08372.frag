uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.41 + t * 1.84 + ph) + sin(p.y * 5.55 - t * 2.87 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.08, vec3(0.46, 0.59, 0.45), vec3(0.31, 0.46, 0.36), vec3(0.94, 0.85, 1.03), vec3(0.02, 0.67, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
