uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.24 + t * 2.45 + ph) + sin(p.y * 8.73 - t * 0.59 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.17;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.08, vec3(0.50, 0.41, 0.43), vec3(0.33, 0.40, 0.40), vec3(1.19, 0.84, 0.95), vec3(0.92, 0.59, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
