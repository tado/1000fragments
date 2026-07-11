uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.27 + sin(p.y * 2.35 + t * 2.25) * 2.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.53;
	p += vec2(0.44, -0.56) * sin(length(p) * 5.51 - time * 1.59) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.16, vec3(0.59, 0.42, 0.52), vec3(0.41, 0.40, 0.40), vec3(0.84, 1.08, 0.71), vec3(0.40, 0.90, 0.45));
	col = mod(col * 1.40, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
