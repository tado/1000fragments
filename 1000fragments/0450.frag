uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.12 + sin(p.y * 1.01 + t * 1.13) * 4.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.50;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.93 + time * 0.04, vec3(0.59, 0.59, 0.42), vec3(0.30, 0.39, 0.46), vec3(1.29, 1.14, 1.03), vec3(0.94, 0.31, 0.08));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
