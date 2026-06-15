uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.34 + vec2(t * 1.21, -t * 1.21) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	p = fract(p * 1.48) - 0.5;
	p *= 2.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.19, vec3(0.46, 0.57, 0.53), vec3(0.37, 0.44, 0.46), vec3(0.79, 1.39, 1.02), vec3(0.24, 0.91, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
