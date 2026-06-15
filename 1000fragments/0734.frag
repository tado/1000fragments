uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.34 + sin(p.y * 4.84 + t * 2.42) * 1.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.89) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.07, vec3(0.52, 0.43, 0.57), vec3(0.42, 0.35, 0.43), vec3(0.98, 1.40, 1.07), vec3(0.70, 0.55, 0.72));
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
