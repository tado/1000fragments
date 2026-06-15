uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.63 + sin(p.y * 2.70 + t * 3.94) * 3.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.05, vec3(0.57, 0.44, 0.50), vec3(0.45, 0.41, 0.38), vec3(1.29, 1.37, 1.18), vec3(0.93, 0.44, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
