uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.42 + sin(p.y * 3.54 + t * 5.14) * 1.78 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.08, vec3(0.54, 0.41, 0.55), vec3(0.50, 0.35, 0.40), vec3(1.38, 1.15, 1.38), vec3(0.34, 0.50, 0.25));
	col = fract(col * 1.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
