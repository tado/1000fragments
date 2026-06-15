uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.78 + sin(p.y * 4.41 + t * 1.05) * 1.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	p *= 3.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.29, vec3(0.53, 0.42, 0.53), vec3(0.36, 0.41, 0.30), vec3(1.13, 0.80, 1.35), vec3(0.44, 0.77, 0.94));
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
