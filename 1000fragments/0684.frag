uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.64 - t * 2.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.18, vec3(0.41, 0.52, 0.43), vec3(0.49, 0.39, 0.40), vec3(1.28, 1.10, 0.97), vec3(0.41, 0.29, 0.80));
	col = mod(col * 2.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
