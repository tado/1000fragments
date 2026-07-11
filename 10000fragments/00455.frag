uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.94 + t * 4.24 + ph) + sin(p.y * 6.91 - t * 0.74 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.13, vec3(0.52, 0.55, 0.48), vec3(0.46, 0.40, 0.35), vec3(1.01, 1.22, 1.26), vec3(0.69, 0.67, 0.12));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
