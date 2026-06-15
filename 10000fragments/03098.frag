uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.37 + sin(p.y * 4.55 + t * 3.56) * 4.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.61;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.07, vec3(0.50, 0.57, 0.48), vec3(0.44, 0.36, 0.50), vec3(1.04, 1.33, 1.28), vec3(0.47, 0.49, 0.57));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
