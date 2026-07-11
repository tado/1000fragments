uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.37 - t * 5.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.29, vec3(0.52, 0.52, 0.57), vec3(0.31, 0.36, 0.34), vec3(1.15, 1.19, 1.06), vec3(0.98, 0.52, 0.45));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
