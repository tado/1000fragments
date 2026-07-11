uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.82 + sin(p.y * 1.88 + t * 5.68) * 3.06 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	p = fract(p * 1.22) - 0.5;
	p += vec2(0.79, -0.38) * sin(length(p) * 3.26 - time * 0.99) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.12, vec3(0.56, 0.55, 0.57), vec3(0.47, 0.47, 0.42), vec3(1.34, 1.17, 0.84), vec3(0.75, 0.83, 0.36));
	col = mod(col * 2.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
