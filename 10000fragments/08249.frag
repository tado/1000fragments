uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.71 + t * 2.27 + ph) + sin(p.y * 6.98 - t * 3.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.20, vec3(0.42, 0.55, 0.44), vec3(0.35, 0.47, 0.40), vec3(1.08, 0.89, 1.39), vec3(0.81, 0.76, 0.65));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
