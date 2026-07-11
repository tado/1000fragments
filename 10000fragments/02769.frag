uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.89 + vec2(t * 0.79, -t * 0.79) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.14, vec3(0.41, 0.41, 0.53), vec3(0.47, 0.43, 0.48), vec3(1.07, 1.21, 0.96), vec3(0.84, 0.73, 0.93));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
