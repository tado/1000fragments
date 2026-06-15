uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.74 - t * 3.35 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.06, vec3(0.41, 0.46, 0.42), vec3(0.42, 0.45, 0.49), vec3(0.71, 0.74, 0.90), vec3(0.76, 0.98, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
