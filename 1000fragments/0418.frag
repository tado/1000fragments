uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.92 + sin(p.y * 5.89 + t * 2.40) * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.20, vec3(0.46, 0.44, 0.50), vec3(0.31, 0.36, 0.48), vec3(1.32, 1.08, 1.24), vec3(0.35, 0.17, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
