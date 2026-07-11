uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.81 + sin(p.y * 3.83 + t * 5.42) * 3.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	p += vec2(0.44, -0.86) * sin(length(p) * 5.91 - time * 0.53) * 0.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.08, vec3(0.46, 0.60, 0.60), vec3(0.35, 0.37, 0.48), vec3(1.38, 1.22, 1.20), vec3(0.74, 0.04, 0.54));
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
