uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.60 + t * 1.12 + ph) + sin(p.y * 11.92 - t * 1.12 + ph)
        + sin((p.x + p.y) * 11.44 + t * 1.12 + ph) + sin(length(p) * 7.65 - t * 1.12 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.17, vec3(0.46, 0.44, 0.60), vec3(0.47, 0.39, 0.45), vec3(1.36, 0.98, 0.86), vec3(0.62, 0.65, 0.19));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
