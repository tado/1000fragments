uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.53 + sin(p.y * 4.22 + t * 3.19) * 2.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	p += vec2(-0.33, -0.54) * sin(length(p) * 3.44 - time * 1.21) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.10, vec3(0.49, 0.51, 0.44), vec3(0.41, 0.48, 0.45), vec3(1.34, 1.12, 0.81), vec3(0.75, 0.15, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
