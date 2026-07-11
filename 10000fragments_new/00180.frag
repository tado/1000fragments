uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.37 + t * 0.51 + ph) + sin(p.y * 10.27 - t * 0.51 + ph)
        + sin((p.x + p.y) * 2.86 + t * 0.51 + ph) + sin(length(p) * 4.87 - t * 0.51 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.30, vec3(0.53, 0.58, 0.47), vec3(0.35, 0.47, 0.37), vec3(1.30, 1.32, 0.80), vec3(0.36, 0.30, 0.84));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
