uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.07 + sin(p.y * 1.92 + t * 2.49) * 1.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.02, vec3(0.55, 0.45, 0.43), vec3(0.38, 0.42, 0.38), vec3(0.97, 0.76, 1.16), vec3(0.99, 0.24, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
