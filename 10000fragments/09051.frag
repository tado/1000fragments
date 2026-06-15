uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.63 + sin(p.y * 3.09 + t * 1.51) * 3.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.79;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.23, vec3(0.59, 0.55, 0.51), vec3(0.49, 0.49, 0.33), vec3(0.93, 1.18, 1.38), vec3(0.85, 0.28, 0.20));
	col = fract(col * 1.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
