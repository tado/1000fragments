uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.49 + sin(p.y * 4.39 + t * 2.81) * 3.09 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 18.3) + 0.5) / 18.3;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.07, vec3(0.43, 0.57, 0.42), vec3(0.34, 0.44, 0.43), vec3(0.79, 0.73, 1.35), vec3(0.06, 0.41, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
