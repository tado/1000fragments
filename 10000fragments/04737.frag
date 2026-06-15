uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.10 - t * 4.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	p = fract(p * 1.61) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.07, vec3(0.55, 0.50, 0.43), vec3(0.47, 0.37, 0.46), vec3(1.00, 1.06, 1.34), vec3(0.34, 0.36, 0.02));
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
