uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.47 + t * 3.89 + ph) + sin(p.y * 4.90 - t * 4.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.08, vec3(0.60, 0.46, 0.48), vec3(0.31, 0.48, 0.42), vec3(0.96, 0.89, 1.04), vec3(0.69, 0.00, 0.66));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
