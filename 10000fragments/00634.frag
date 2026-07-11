uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.14 + sin(p.y * 4.46 + t * 5.54) * 3.31 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.47;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.11, vec3(0.53, 0.49, 0.59), vec3(0.31, 0.37, 0.43), vec3(0.99, 1.34, 0.76), vec3(0.75, 0.80, 0.46));
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
