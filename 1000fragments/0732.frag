uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.96 + sin(p.y * 1.86 + t * 4.64) * 2.57 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.30, vec3(0.40, 0.53, 0.44), vec3(0.31, 0.38, 0.49), vec3(0.72, 1.11, 1.10), vec3(0.42, 0.88, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
