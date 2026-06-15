uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.53 + t * 2.72 + ph) + sin(p.y * 14.69 - t * 2.42 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.54;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.20, vec3(0.56, 0.44, 0.41), vec3(0.46, 0.31, 0.34), vec3(0.90, 1.21, 1.35), vec3(0.43, 0.35, 0.36));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
