uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.42 + sin(p.y * 3.59 + t * 5.59) * 4.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.11, vec3(0.45, 0.46, 0.49), vec3(0.42, 0.44, 0.47), vec3(1.17, 0.90, 1.37), vec3(0.19, 0.88, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
